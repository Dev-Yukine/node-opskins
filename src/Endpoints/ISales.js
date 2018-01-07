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
		const result = await this._get({ methodName: 'GetInventory', query });
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
};
