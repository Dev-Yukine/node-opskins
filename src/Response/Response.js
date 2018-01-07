module.exports = class OPSkinsResponse {
	constructor(data) {
		const { body, headers } = data;
		this.time = body.time ? body.time : null;
		this.balance = body.balance ? body.balance : null;
		this.credits = body.credits ? body.credits : null;
		this.currentPage = body.current_page ? body.current_page : null;
		this.totalPages = body.total_pages ? body.total_pages : null;
		this.queriesRemaining = headers['X-Queries-Remaining'];
		this.response = body.response;
	}
};
