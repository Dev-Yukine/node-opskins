module.exports = class OPSkinsResponse {
	constructor(data) {
		this.time = data.time;
		this.balance = data.balance;
		this.credits = data.credits;
		this.currentPage = data.current_page;
		this.totalPages = data.total_pages;
		this.response = data.response;
	}
};
