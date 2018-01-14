const Endpoint = require('./Endpoint.js');
const Client = require('../Client/Client.js'); // eslint-disable-line no-unused-vars
const OPSkinsResponse = require('../Response/Response.js'); // eslint-disable-line no-unused-vars
/**
 * The Test Interface for the OPSkins API
 * @class
 * @extends {Endpoint}
*/

module.exports = class Test extends Endpoint {
	/**
	 * Creates a new Instance of this Test Interface class
	 * @param {Client} client the client that instantiated this class
	 */

	constructor(client) {
		super(client, 'ITest');
	}
	/**
	 * Used to test an unauthenticated request.
	 * @returns {Promise<OPSkinsResponse>}
	*/
	async test() {
		const result = await this._get({ methodName: 'Test' });
		return new this.Response(result);
	}
	/**
	 * Used to test an authenticated request.
	 * @returns {Promise<OPSkinsResponse>}
	*/
	async testAuth() {
		const result = await this._get({ methodName: 'TestAuthed' });
		return new this.Response(result);
	}
};
