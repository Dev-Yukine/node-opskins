const Endpoint = require('./Endpoint.js');

module.exports = class User extends Endpoint {
	constructor(client) {
		super(client, 'IUser');
	}

	async getBalance() {
		const result = await this._get({ methodName: 'GetBalance' });
		return new this.Response(result);
	}

	async saveTradeURL() {
		const result = await this._get({ methodName: 'SaveTradeURL' });
		return new this.Response(result);
	}
};
