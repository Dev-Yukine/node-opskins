const { get, post } = require('snekfetch');
const { CustomErrorConstructor } = require('../Errors/CustomErrors.js');
const { stringify } = require('querystring');


module.exports = class Endpoint {
	constructor(client, name) {
		this.baseURL = 'https://api.opskins.com';
		this.name = name;
		this.client = client;
		this.Response = require('../Response/Response.js');
	}

	path(methodName, gatewayVersion) {
		const { baseURL, name } = this;
		return `${baseURL}/${name}/${methodName}/v${gatewayVersion}`;
	}

	async _get(options) {
		let { methodName, gatewayVersion, query } = options;
		if (!gatewayVersion) gatewayVersion = 1;
		const path = this.path(methodName, gatewayVersion);
		const request = get(path)
			.set('Authorization', `Basic ${Buffer.from(`${this.client.token}:`, 'ascii').toString('base64')}`);
		if (query) {
			for (const queryElement of query) {
				if (queryElement && queryElement.key && queryElement.value) {
					request.query(queryElement.key, queryElement.value);
				}
			}
		}
		this.client.emit('debug', `GET request to ${path}`);
		const { body, headers } = await request;
		this.client.emit('debug', `OPSkins API successful responded to GET request with status code: ${body.status}`);
		this.client.emit('queriesRemaining', Number(headers['x-queries-remaining']));
		if (body.status !== 1) throw CustomErrorConstructor.construct(body);
		return { body, headers };
	}

	async _post(options) {
		let { methodName, gatewayVersion, data } = options;
		if (!gatewayVersion) gatewayVersion = 1;
		const path = this.path(methodName, gatewayVersion);
		for (const property in data) {
			if (!data.hasOwnProperty(property)) {
				continue;
			}

			if (data[property] instanceof Array) {
				for (const value in data[property]) {
					data[`${property}[${value}]`] = value;
				}
				delete data[property];
			}
		}
		this.client.emit('debug', `POST request to ${path}`);
		const { body, headers } = await post(path)
			.set('Authorization', `Basic ${Buffer.from(`${this.client.token}:`, 'ascii').toString('base64')}`)
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send(stringify(data));
		this.client.emit('debug', `OPSkins API successful responded to POST request with status code: ${body.status}`);
		this.client.emit('queriesRemaining', Number(headers['x-queries-remaining']));
		if (body.status !== 1) throw CustomErrorConstructor.construct(body);
		return { body, headers };
	}
};
