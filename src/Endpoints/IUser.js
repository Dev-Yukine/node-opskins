const Endpoint = require('./Endpoint.js');
const Client = require('../Client/Client.js'); // eslint-disable-line no-unused-vars
const OPSkinsResponse = require('../Response/Response.js'); // eslint-disable-line no-unused-vars
/**
 * The User Interface for the OPSkins API
 * @class
 * @extends {Endpoint}
*/

module.exports = class User extends Endpoint {
	/**
	 * Creates a new Instance of this User Interface class
	 * @param {Client} client the client that instantiated this class
	 */

	constructor(client) {
		super(client, 'IUser');
	}
	/**
	 * Used to get the current balance of your OPSkins account.
	 * @returns {Promise<OPSkinsResponse>}
	*/

	async getBalance() {
		const result = await this._get({ methodName: 'GetBalance' });
		return new this.Response(result);
	}
	/**
	 * Update your account's trade URL.
	 * @param {string} tradeUrl Your new trade URL. Must be for the Steam account linked with this OPSkins account, or else will be rejected.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async saveTradeURL(tradeUrl) {
		const data = { tradeUrl };
		const result = await this._post({ methodName: 'SaveTradeURL', data });
		return new this.Response(result);
	}
};
