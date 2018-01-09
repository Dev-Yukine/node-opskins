const Endpoint = require('./Endpoint.js');

module.exports = class Status extends Endpoint {
	constructor(client) {
		super(client, 'IStatus');
	}

	async getBotList() {
		const result = await this._get({ methodName: 'GetBotList' });
		return new this.Response(result);
	}
};
