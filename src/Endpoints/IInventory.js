const Endpoint = require('./Endpoint.js');
const Client = require('../Client/Client.js'); // eslint-disable-line no-unused-vars
const OPSkinsResponse = require('../Response/Response.js'); // eslint-disable-line no-unused-vars

/**
 * The Inventory Interface for the OPSkins API
 * @class
 * @extends {Endpoint}
*/

module.exports = class Inventory extends Endpoint {
	/**
	 * Creates a new Instance of this Inventory Interface class
	 * @param {Client} client the client that instantiated this class
	 */

	constructor(client) {
		super(client, 'IInventory');
	}
	/**
	 * Gets the contents of your OPSkins inventory
	 * @param {Object} [options={}] Options for the method
	 * @param {number} [options.page] Number of page to show
	 * @param {number} [options.perPage] Number of items per page to return
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async getInventory(options = {}) {
		const { page, perPage } = options;
		const query = [{ key: 'page', value: page }, { key: 'per_page', value: perPage }];
		const result = await this._get({ methodName: 'GetInventory', query, gatewayVersion: 2 });
		return new this.Response(result);
	}
	/**
	 * Requests a withdrawal trade offer for one or more items in your OPSkins inventory.
	 * @param {Array<string>} items An array of item IDs to withdraw
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async withdraw(items) {
		const data = { items: items.join(',') };
		const result = await this._post({ methodName: 'Withdraw', data });
		return new this.Response(result);
	}
	/**
	 * An Object describing an item to deposit
	 * @typedef {Object} DepositObject
	 * @property {number} appid The Steam AppID of the game which owns this item (e.g. 730 for CS:GO, 440 for TF2, 570 for Dota 2)
	 * @property {number} contextid The Steam context ID which contains this item (2 for Valve games, 6 for Steam Community items, 1 for H1Z1, etc.). When you right-click on an item in your Steam inventory and copy its URL, the context ID is the second number after the hash.
	 * @property {number} assetid The Steam asset ID of the item. This is also known as just the item's id
	 */

	/**
	 * Add between 1 and 50 items (upper cap subject to change) to your On-Site Inventory.
	 * @param {Array<DepositObject>} items An array of item Objects to deposit
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async deposit(items) {
		const data = { items };
		const result = await this._post({ methodName: 'Deposit', data });
		return new this.Response(result);
	}
};
