const Endpoint = require('./Endpoint.js');
const Client = require('../Client/Client.js'); // eslint-disable-line no-unused-vars
const OPSkinsResponse = require('../Response/Response.js'); // eslint-disable-line no-unused-vars
/**
 * The Cashout Interface for the OPSkins API
 * @class
 * @extends {Endpoint}
*/

module.exports = class Cashout extends Endpoint {
	/**
	 * Creates a new Instance of this Cashout Interface class
	 * @param {Client} client the client that instantiated this class
	 */

	constructor(client) {
		super(client, 'ICashout');
	}
	/**
	 * Get your saved cashout address for a particular processor.
	 * @param {number} processor the processor id (use the Enum Processors here, what is exported from the main module)
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async getAdress(processor) {
		const query = [{ key: 'processor', value: processor }];
		const result = await this._get({ methodName: 'GetAddress', query });
		return new this.Response(result);
	}
	/**
	 * Set your saved cashout address for a particular processor.
	 * @param {number} processor the processor id (use the Enum Processors here, what is exported from the main module)
	 * @param {string} adress new adress
	 * @param {number} twofactorCode Optional if setting your address for the first time, or updating your Bitcoin address. Required otherwise. This is your current TOTP authentication code.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async setAddress(processor, adress, twofactorCode) {
		const data = { processor, adress, twofactor_code: twofactorCode }; // eslint-disable-line camelcase
		const result = await this._post({ methodName: 'SetAddress', data });
		return new this.Response(result);
	}
	/**
	 * Retrieves a list of pending cashouts on your account.
	 * @returns {Promise<OPSkinsResponse>}
	*/

	async getPendingCashouts() {
		const result = await this._get({ methodName: 'GetPendingCashouts' });
		return new this.Response(result);
	}
	/**
	 * Attempts to cancel a pending cashout. If OPSkins are currently working on processing cashouts, this may reject.
	 * @param {number} cashoutid The ID of the cashout you wish to cancel
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async cancelPendingCashout(cashoutid) {
		const data = { cashoutid };
		const result = await this._post({ methodName: 'CancelPendingCashout', data });
		return new this.Response(result);
	}
	/**
	 * Get the current approximate BTC/USD exchange rate which will be used if you request an instant Bitcoin cashout.
	 * @returns {Promise<OPSkinsResponse>}
	*/

	async getBitcoinInstantCashoutRate() {
		const result = await this._get({ methodName: 'GetBitcoinInstantCashoutRate' });
		return new this.Response(result);
	}
	/**
	 * Request a cashout via PayPal.
	 * @param {number} amount The amount you wish to cashout, in USD cents.
	 * @param {boolean} [priority = false] a boolean indicating if you want this to be a priority cashout.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async requestPayPal(amount, priority = false) {
		const data = { amount, priority: Number(priority) };
		const result = await this._post({ methodName: 'RequestPayPal', data });
		return new this.Response(result);
	}
	/**
	 * Request a cashout via Bitcoin.
	 * @param {number} amount The amount you wish to cashout, in USD cents.
	 * @param {boolean} [priority = false] a boolean indicating if you want this to be a priority cashout.
	 * @returns {Promise<OPSkinsResponse>}
	 */

	async requestBitcoin(amount, priority = false) {
		const data = { amount, priority: Number(priority) };
		const result = await this._post({ methodName: 'RequestBitcoin', data });
		return new this.Response(result);
	}
	/**
	 * Request a cashout via Skrill.
	 * @param {number} amount The amount you wish to cashout, in USD cents.
	 * @returns {Promise<OPSkinsResponse>}
	 */
	async requestSkrill(amount) {
		const data = { amount };
		const result = await this._post({ methodName: 'RequestSkrill', data });
		return new this.Response(result);
	}
	/**
	 * Get your account's balance, including how much of your balance can be cashed out.
	 * @returns {Promise<OPSkinsResponse>}
	*/
	async getCashoutableBalance() {
		const result = await this._get({ methodName: 'GetCashoutableBalance' });
		return new this.Response(result);
	}
};
