/**
 * Absract Class for the Processors numbers
 * @class
*/

class Processors {
	/**
	 * PayPal Identifier
	 */

	static get PAYPAL() { return 1; }
	/**
	 * BitCoin Identifier
	 */

	static get BITCOIN() { return 3; }
	/**
	 * Skrill Identifier
	 */

	static get SKRILL() { return 5; }
}

module.exports = { Processors };
