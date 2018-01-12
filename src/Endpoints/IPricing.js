const Endpoint = require('./Endpoint.js');
const Client = require('../Client/Client.js'); // eslint-disable-line no-unused-vars
const OPSkinsResponse = require('../Response/Response.js'); // eslint-disable-line no-unused-vars
/**
 * The Pricing Interface for the OPSkins API
 * @class
 * @extends {Endpoint}
*/

module.exports = class Pricing extends Endpoint {
	/**
	 * Creates a new Instance of this Pricing Interface class
	 * @param {Client} client the client that instantiated this class
	 */

	constructor(client) {
		super(client, 'IPricing');
	}
	/**
	 * Gets the list of pricing for all items listed on OPSkins for a particular app.
	 * @param {number} appid The Steam application ID of the app you want prices for. For example, 730 for CS:GO, 440 for TF2, or 753 for Steam.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async getPriceList(appid) {
		const query = [{ key: 'appid', value: appid }];
		const result = await this._get({ methodName: 'GetPriceList', query, gatewayVersion: 2 });
		return new this.Response(result);
	}
	/**
	 * Gets the lowest list price and quantity on sale for every item on OPSkins for a particular app.
	 * @param {number} appid The Steam application ID of the app you want prices for. For example, 730 for CS:GO, 440 for TF2, or 753 for Steam.
	 * @returns {Promise<OPSkinsResponse>}
	 */
	async getAllLowestListPrices(appid) {
		const query = [{ key: 'appid', value: appid }];
		const result = await this._get({ methodName: 'GetAllLowestListPrices', query });
		return new this.Response(result);
	}
};
