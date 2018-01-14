/**
 * Represent a Response from the OPSkins API
 * @class
*/

module.exports = class OPSkinsResponse {
	/**
	 * Instanciate this OPSkins Respond Class
	 * @param {Object} data the data of the request
	 */
	constructor(data) {
		const { body, headers } = data;
		this.time = body.time || null;
		this.balance = body.balance || null;
		this.credits = body.credits || null;
		this.currentPage = body.current_page || null;
		this.totalPages = body.total_pages || null;
		this.queriesRemaining = headers['x-queries-remaining'] || null;
		this.response = body.response || null;
	}
};
