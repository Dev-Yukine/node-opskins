const Endpoint = require('./Endpoint.js');

module.exports = class Test extends Endpoint {
	constructor(client) {
		super(client, 'ITest');
	}

	async test() {
		const result = await this._get({ methodName: 'Test' });
		return new this.Response(result);
	}

	async testAuth() {
		const result = await this._get({ methodName: 'TestAuthed' });
		return new this.Response(result);
	}
};
