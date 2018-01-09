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

	async _get(options = { gatewayVersion: 1 }) {
		const { methodName, gatewayVersion, data } = options;
		const path = this.path(methodName, gatewayVersion);
		const request = get(path)
			.set('Authorization', `Basic ${Buffer.from(`${this.client.token}:`, 'ascii').toString('base64')}`);
		for (const query of data) {
			if (query && query.key && query.value) {
				request.query(query.key, query.value);
			}
		}
		this.client.emit('debug', `GET request to ${path}`);
		const { body, headers } = await request;
		this.client.emit('debug', `OPSkins API successful responded to GET request with status code: ${body.status}`);
		this.client.emit('queriesRemaining', Number(headers['X-Queries-Remaining']));
		if (body.status !== 1) throw CustomErrorConstructor.construct(body.status);
		return { body, headers };
	}

	async _post(options = { gatewayVersion: 1 }) {
		const { methodName, gatewayVersion, data } = options;
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
		this.client.emit('queriesRemaining', Number(headers['X-Queries-Remaining']));
		if (body.status !== 1) throw CustomErrorConstructor.construct(body.status);
		return { body, headers };
	}
};
