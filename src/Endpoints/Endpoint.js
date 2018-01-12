const { get, post } = require('snekfetch');
const { CustomErrorConstructor } = require('../Errors/CustomErrors.js');
const { stringify } = require('querystring');
const Client = require('../Client/Client.js'); // eslint-disable-line no-unused-vars
const Response = require('../Response/Response.js');

/**
 * Represent any Endpoint of the OPSkins API
 * @class
 * @property {string} baseURL the API base url
 * @property {string} name the name of this endpoint
 * @property {Client} client the client what instantiated this endpoint
 * @property {Response} Response the Response class to instantiate
*/

module.exports = class Endpoint {
	/**
	 * Creates a Endpoint class with all core methods for every endpoint
	 * @param {Client} client the client that instantiated this class
	 * @param {string} name the name of this endpoint
	 */

	constructor(client, name) {
		this.baseURL = 'https://api.opskins.com';
		this.name = name;
		this.client = client;
		this.Response = Response;
	}

	/**
	 * Util method to create the path we need to send the request
	 * @param {string} methodName the name of this method
	 * @param {string} gatewayVersion the version of the gateaway
	 * @returns {string}
	 */

	path(methodName, gatewayVersion) {
		const { baseURL, name } = this;
		return `${baseURL}/${name}/${methodName}/v${gatewayVersion}`;
	}

	/**
 	 * The return of a POST or GET request.
 	 * @typedef {Object} RequestReturn
 	 * @property {Object} headers - the returned header.
	 * @property {Buffer} body - Indicates whether the Power component is present.
 	 */

	/**
	 * A Query Object
	 * @typedef {Object} Query
	 * @property {string} key the key of this Query.
	 * @property {*} value the value of this Query.
	 */

	/**
	 * Get request method
	 * @param {Object} options the options for this request
	 * @param {string} options.methodName the name of the current method
	 * @param {number} options.gatewayVersion the version of the Method Gateaway (default is 1)
	 * @param {Array<Query>} options.query the query to apply on this request
	 * @returns {Promise<RequestReturn>}
	 */

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

	/**
	 * POST request method
	 * @param {Object} options the options for this request
	 * @param {string} options.methodName the name of the current method
	 * @param {number} options.gatewayVersion the version of the Method Gateaway (default is 1)
	 * @param {Object} options.data the body of this request.
	 * @returns {RequestReturn}
	 */

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
