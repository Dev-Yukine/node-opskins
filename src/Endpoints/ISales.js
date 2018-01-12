const Endpoint = require('./Endpoint.js');
const Client = require('../Client/Client.js'); // eslint-disable-line no-unused-vars
const OPSkinsResponse = require('../Response/Response.js'); // eslint-disable-line no-unused-vars
/**
 * The Sales Interface for the OPSkins API
 * @class
 * @extends {Endpoint}
*/

module.exports = class Sales extends Endpoint {
	/**
	 * Creates a new Instance of this Sales Interface class
	 * @param {Client} client the client that instantiated this class
	 */

	constructor(client) {
		super(client, 'ISales');
	}
	/**
	 * Gets a list of item sales for your account. This endpoint is paginated..
	 * @param {Object} [options={}] options of this method
	 * @param {number} [options.type] If provided, limit results to sales in this status. If not provided, return all sale statuses.
	 * @param {number} [options.appid] If provided, limit results to sales for this Steam AppID. If not provided, return all apps.
	 * @param {number} [options.afterSaleID] If provided, limit results to sales with IDs greater than this.
	 * @param {number} [options.perPage] Number of items per page to return. Defaults to 10000. If you pass a value larger than 10,000, then it will be capped to 10,000.
	 * @param {string} [options.sort] Sorts the results by the chosen sort type. If not provided, returns results by ascending sale ID.
	 * @param {number} [options.page] Page number to request. Defaults to 1.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async getSales(options = {}) {
		const { type, appid, afterSaleID, page, perPage, sort } = options;
		const query = [
			{ key: 'type', value: type },
			{ key: 'appid', value: appid },
			{ key: 'after_saleid', value: afterSaleID },
			{ key: 'page', value: page },
			{ key: 'per_page', value: perPage },
			{ key: 'sort', value: sort }
		];
		const result = await this._get({ methodName: 'GetSales', query });
		return new this.Response(result);
	}
	/**
	 * Get the current limit of how many items you can list for sale in one request.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async getListingLimit() {
		const result = await this._get({ methodName: 'GetListingLimit' });
		return new this.Response(result);
	}
	/**
	 * An Object describing an item to List
	 * @typedef {Object} ListItem
	 * @property {number} appid The Steam AppID of the game which owns this item (e.g. 730 for CS:GO, 440 for TF2, 570 for Dota 2)
	 * @property {number} contextid The Steam context ID which contains this item (2 for Valve games, 6 for Steam Community items, 1 for H1Z1, etc.). When you right-click on an item in your Steam inventory and copy its URL, the context ID is the second number after the hash.
	 * @property {number} assetid The Steam asset ID of the item. This is also known as just the item's id
	 * @property {number} price The desired list price for this item, before commission. Pass this in USD cents.
	 * @property {Array<String>} addons An array of addons.
	 */

	/**
	 * Lists between 1 and 50 items for sale (upper cap subject to change).
	 * @param {Array<ListItem>} items items to list
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async listItems(items) {
		const data = { items };
		const result = await this._post({ methodName: 'ListItems', data });
		return new this.Response(result);
	}
	/**
	 * Edits the price of an item you currently have listed. If the item is in your OPSkins inventory, it lists it for sale.
	 * @param {number} saleid The ID of the sale/item you want to edit the price for (must be yours)
	 * @param {number} price The new price for your item, in USD cents.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async editPrice(saleid, price) {
		const data = { saleid, price };
		const result = await this._post({ methodName: 'EditPrice', data });
		return new this.Response(result);
	}
	/**
	 * An Object describing an item to List
	 * @typedef {Object} ItemToEdit
	 * @property {number} id The id of this Item.
	 * @property {number} price The desired list price for this item, before commission. Pass this in USD cents.
	 */

	/**
	 * Queue price updates for up to 500 items.
	 * @param {Array<ItemToEdit>} items Array of Items to edit
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async editPrices(items) {
		const prices = {};
		for (const saleid in items) {
			if (!items.hasOwnProperty(saleid)) {
				continue;
			}
			prices[`items[${saleid}]`] = items[saleid];
		}
		const data = { items: prices };
		const result = await this._post({ methodName: 'EditPriceMulti', data });
		return new this.Response(result);
	}
	/**
	 * Bump one or more items you've listed for sale to the top of the browse page and the featured (default) sort for search.
	 * @param {Array<number>} items Array of IDs to bump
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async bumpItems(items) {
		const data = { items: items.join(',') };
		const result = await this._post({ methodName: 'BumpItems', data });
		return new this.Response(result);
	}
	/**
	 * Return one or more items you've listed for sale to your Steam accounts.
	 * @param {Array<number>} items Array of IDs to return.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async returnItems(items) {
		const data = { items: items.join(',') };
		const result = await this._post({ methodName: 'ReturnItems', data });
		return new this.Response(result);
	}
	/**
	 * Get the list of active trade offers which our bots have sent you.
	 * @returns {Promise<OPSkinsResponse>}
	*/

	async getActiveTradeOffers() {
		const result = await this._get({ methodName: 'GetActiveTradeOffers' });
		return new this.Response(result);
	}
	/**
	 * Search active OPSkins listings for particular items.
	 * @param {number} app This is the appid_contextid pair for the app you wish to search. For example, use 730_2 to search CS:GO listings.
	 * @param {Object} [options = {}] optional parameter for the search query.
	 * @param {string} [options.searchItem] This is the search term which will be matched to item names
	 * @param {number} [options.min] The minimum item price to return, in USD.
	 * @param {number} [options.max] The maximum item price to return, in USD.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async search(app, options = {}) {
		const { searchItem, min, max } = options;
		const query = [
			{ key: 'app', value: app },
			{ key: 'search_item', value: searchItem },
			{ key: 'min', value: min },
			{ key: 'max', value: max }
		];
		const result = await this._get({ methodName: 'Search', query });
		return new this.Response(result);
	}
	/**
	 * Purchase one or more items and deliver them to your OPSkins inventory.
	 * @param {Array<numbers>} saleIDs Array of IDs to buy
	 * @param {number} total The total cost of these items, in USD cents. For example, if you are purchasing a $2 item and a $1.23 item, then this should be 323. The request will fail if this does not match the actual total.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async buyItems(saleIDs, total) {
		const data = { saleids: saleIDs.join(','), total };
		const result = await this._post({ methodName: 'BuyItems', data });
		return new this.Response(result);
	}
	/**
	 * Get data about the most recent sales for a given item.
	 * @param {Object} [options = {}] the options for this query.
	 * @param {number} [options.appID] The Steam AppID of the game which owns the item you're interested in
	 * @param {number} [options.contextID] The Steam context ID for the item you're interested in
	 * @param {string} [options.marketName] The full market name of the item you're interested in, for example: "AK-47 | Aquamarine Revenge (Field-Tested)"
	 * @param {number} [options.val]  If you're interested in a particular variant of the item, this is its unusual effect index (for TF2) or pattern/paint index (for CS:GO)
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async getLastSales(options = {}) {
		const { appID, contextID, marketName, val } = options;
		const query = [
			{ name: 'appid', value: appID },
			{ name: 'contextid', value: contextID },
			{ name: 'market_name', value: marketName },
			{ name: 'val_1', value: val }
		];
		const result = await this._get({ methodName: 'GetLastSales', query });
		return new this.Response(result);
	}
	/**
	 * Returns a list of possible sale states and localized strings that go with them.
	 * @returns {Promise<OPSkinsResponse>}
	*/
	async getSaleStatuses() {
		const result = await this._get({ methodName: 'GetSaleStatuses' });
		return new this.Response(result);
	}
};
