const Endpoint = require('./Endpoint.js');

module.exports = class Pricing extends Endpoint {
	constructor(client) {
		super(client, 'IPricing');
	}

	async getPriceList(appid) {
		const query = [{ key: 'appid', value: appid }];
		const result = await this._get({ methodName: 'GetPriceList', query, gatewayVersion: 2 });
		return new this.Response(result);
	}

	async getAllLowestListPrices(appid) {
		const query = [{ key: 'appid', value: appid }];
		const result = await this._get({ methodName: 'GetAllLowestListPrices', query });
		return new this.Response(result);
	}
};
