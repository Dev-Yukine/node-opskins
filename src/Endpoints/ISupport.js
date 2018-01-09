const Endpoint = require('./Endpoint.js');

module.exports = class Support extends Endpoint {
	constructor(client) {
		super(client, 'ISupport');
	}

	async repairItem(saleID) {
		const query = [{ name: 'saleid', value: saleID }];
		const result = await this._get({ methodName: 'RepairItem', query });
		return new this.Response(result);
	}
};
