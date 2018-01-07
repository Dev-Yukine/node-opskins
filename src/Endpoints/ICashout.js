const Endpoint = require('./Endpoint.js');

module.exports = class Cashout extends Endpoint {
	constructor(client) {
		super(client, 'ICashout');
	}

	async getAdress(processor) {
		const query = [{ processor }];
		const result = await this._get({ methodName: 'GetAddress', query });
		return new this.Response(result);
	}

	async setAddress(processor, adress, twofactorCode) {

	}
};
