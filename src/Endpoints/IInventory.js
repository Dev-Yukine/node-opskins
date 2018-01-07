const Endpoint = require('./Endpoint.js');

module.exports = class Inventory extends Endpoint {
	constructor(client) {
		super(client, 'IInventory');
	}

	async getInventory({ page, perPage } = {}) {
		const query = [{ key: 'page', value: page }, { key: 'per_page', value: perPage }];
		const result = await this._get({ methodName: 'GetInventory', query, gatewayVersion: 2 });
		return new this.Response(result);
	}

	async withdraw(items) {
		const data = { items: items.join(',') };
		const result = await this._post({ methodName: 'Withdraw', data });
		return new this.Response(result);
	}

	async deposit(items) {
		const data = { items };
		const result = await this._post({ methodName: 'Deposit', data });
		return new this.Response(result);
	}
};
