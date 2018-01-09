const Endpoint = require('./Endpoint.js');

module.exports = class Sales extends Endpoint {
	constructor(client) {
		super(client, 'ISales');
	}

	async getSales({ type, appid, afterSaleID, page, perPage, sort } = {}) {
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

	async getListingLimit() {
		const result = await this._get({ methodName: 'GetListingLimit' });
		return new this.Response(result);
	}

	async listItems(items) {
		const data = { items };
		const result = await this._post({ methodName: 'ListItems', data });
		return new this.Response(result);
	}

	async editPrice(saleid, price) {
		const data = { saleid, price };
		const result = await this._post({ methodName: 'EditPrice', data });
		return new this.Response(result);
	}

	async editPrices(priceObject) {
		const prices = {};
		for (const saleid in priceObject) {
			if (!priceObject.hasOwnProperty(saleid)) {
				continue;
			}
			prices[`items[${saleid}]`] = priceObject[saleid];
		}
		const data = { items: prices };
		const result = await this._post({ methodName: 'EditPriceMulti', data });
		return new this.Response(result);
	}

	async bumpItems(items) {
		const data = { items: items.join(',') };
		const result = await this._post({ methodName: 'BumpItems', data });
		return new this.Response(result);
	}

	async getActiveTradeOffers() {
		const result = await this._get({ methodName: 'GetActiveTradeOffers' });
		return new this.Response(result);
	}

	async search(app, { searchItem, min, max } = {}) {
		const query = [
			{ key: 'app', value: app },
			{ key: 'search_item', value: searchItem },
			{ key: 'min', value: min },
			{ key: 'max', value: max }
		];
		const result = await this._get({ methodName: 'Search', query });
		return new this.Response(result);
	}

	async buyItems(saleIDs, total) {
		const data = { saleids: saleIDs.join(','), total };
		const result = await this._post({ methodName: 'BuyItems', data });
		return new this.Response(result);
	}

	async getLastSales(appID, contextID, marketName, val) {
		const query = [
			{ name: 'appid', value: appID },
			{ name: 'contextid', value: contextID },
			{ name: 'market_name', value: marketName },
			{ name: 'val_1', value: val }
		];
		const result = await this._get({ methodName: 'GetLastSales', query });
		return new this.Response(result);
	}

	async getSaleStatuses() {
		const result = await this._get({ methodName: 'GetSaleStatuses' });
		return new this.Response(result);
	}
};
