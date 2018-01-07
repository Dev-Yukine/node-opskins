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
		const request = get(this.path(methodName, gatewayVersion))
			.set('Authorization', `Basic ${Buffer.from(`${this.client.token}:`, 'ascii').toString('base64')}`);
		for (const query of data) {
			request.query(query.name, query.value);
		}
		const { body } = await request;
		if (body.status !== 1) throw CustomErrorConstructor.construct(body.status);
		return body;
	}

	async _post(options = { gatewayVersion: 1 }) {
		const { methodName, gatewayVersion, data } = options;
		const { body } = await post(this.path(methodName, gatewayVersion))
			.set('Authorization', `Basic ${Buffer.from(`${this.client.token}:`, 'ascii').toString('base64')}`)
			.send(stringify(data));
		if (body.status !== 1) throw CustomErrorConstructor.construct(body.status);
		return body;
	}
};
