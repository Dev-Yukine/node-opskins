const Endpoint = require('./Endpoint.js');
const Client = require('../Client/Client.js'); // eslint-disable-line no-unused-vars
const OPSkinsResponse = require('../Response/Response.js'); // eslint-disable-line no-unused-vars
/**
 * The Status Interface for the OPSkins API
 * @class
 * @extends {Endpoint}
*/

module.exports = class Status extends Endpoint {
	/**
	 * Creates a new Instance of this Status Interface class
	 * @param {Client} client the client that instantiated this class
	 */

	constructor(client) {
		super(client, 'IStatus');
	}
	/**
	 * Retrieves a listing of all active OPSkins bots, namely their internal IDs (the number in their Steam name), their SteamIDs, and their online status.
	 * @returns {Promise<OPSkinsResponse>}
	*/

	async getBotList() {
		const result = await this._get({ methodName: 'GetBotList' });
		return new this.Response(result);
	}
};
