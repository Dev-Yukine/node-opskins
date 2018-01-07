const Endpoint = require('./Endpoint.js');

module.exports = class Cashout extends Endpoint {
	constructor(client) {
		super(client, 'ICashout');
	}

	async getAdress(processor) {
		const query = [{ key: 'processor', value: processor }];
		const result = await this._get({ methodName: 'GetAddress', query });
		return new this.Response(result);
	}

	async setAddress(processor, adress, twofactorCode) {
		const data = { processor, adress, twofactor_code: twofactorCode }; // eslint-disable-line camelcase
		const result = await this._post({ methodName: 'SetAddress', data });
		return new this.Response(result);
	}

	async getPendingCashouts() {
		const result = await this._get({ methodName: 'GetPendingCashouts' });
		return new this.Response(result);
	}

	async cancelPendingCashout(cashoutid) {
		const data = { cashoutid };
		const result = await this._post({ methodName: 'CancelPendingCashout', data });
		return new this.Response(result);
	}

	async getBitcoinInstantCashoutRate() {
		const result = await this._get({ methodName: 'GetBitcoinInstantCashoutRate' });
		return new this.Response(result);
	}

	async requestPayPal(amount, priority = false) {
		const data = { amount, priority: Number(priority) };
		const result = await this._post({ methodName: 'RequestPayPal', data });
		return new this.Response(result);
	}

	async requestBitcoin(amount, priority = false) {
		const data = { amount, priority: Number(priority) };
		const result = await this._post({ methodName: 'RequestBitcoin', data });
		return new this.Response(result);
	}

	async requestSkrill(amount) {
		const data = { amount };
		const result = await this._post({ methodName: 'RequestSkrill', data });
		return new this.Response(result);
	}

	async getCashoutableBalance() {
		const result = await this._get({ methodName: 'GetCashoutableBalance' });
		return new this.Response(result);
	}
};
