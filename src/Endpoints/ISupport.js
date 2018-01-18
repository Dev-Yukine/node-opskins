const Endpoint = require('./Endpoint.js');
const Client = require('../Client/Client.js'); // eslint-disable-line no-unused-vars
const OPSkinsResponse = require('../Response/Response.js'); // eslint-disable-line no-unused-vars
/**
 * The Support Interface for the OPSkins API
 * @class
 * @extends {Endpoint}
*/

module.exports = class Support extends Endpoint {
	/**
	 * Creates a new Instance of this Support Interface class
	 * @param {Client} client the client that instantiated this class
	 */

	constructor(client) {
		super(client, 'ISupport');
	}
	/**
	 * Attempts to repair a sale that is in a broken "Contact Support" state. This will also attempt to repair all other broken items on the same bot.
	 * @param {number} saleID The ID of the sale (or on-site inventory item) that you want to attempt to repair
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async repairItem(saleID) {
		const data = { saleID };
		const result = await this._post({ methodName: 'RepairItem', data });
		return new this.Response(result);
	}
};
