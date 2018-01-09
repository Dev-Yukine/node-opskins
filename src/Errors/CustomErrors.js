const errorCodes = require('./ErrorCodes.json');

class CustomErrorConstructor {
	static construct(requestBody) {
		const { status, message } = requestBody;
		if (status > 1000 && status < 2000) {
			return new AccountError(status, message);
		} else if (status >= 2000 && status < 3000) {
			return new InternalError(status, message);
		} else if (status >= 3000 && status < 4000) {
			return new UserError(status, message);
		} else if (status >= 4000 && status < 5000) {
			return new ThirdPartyError(status, message);
		}
	}
}

class AccountError extends Error {
	constructor(statusCode, detailedMessage) {
		const { message, genericMessage } = errorCodes[statusCode];
		super(message);
		this.name = this.constructor.name;
		this.status = statusCode;
		this.detailedMessage = detailedMessage;
		this.genericMessage = genericMessage;
	}
}

class InternalError extends Error {
	constructor(statusCode, detailedMessage) {
		const { message, genericMessage } = errorCodes[statusCode];
		super(message);
		this.name = this.constructor.name;
		this.status = statusCode;
		this.detailedMessage = detailedMessage;
		this.genericMessage = genericMessage;
	}
}

class UserError extends Error {
	constructor(statusCode, detailedMessage) {
		const { message, genericMessage } = errorCodes[statusCode];
		super(message);
		this.name = this.constructor.name;
		this.status = statusCode;
		this.detailedMessage = detailedMessage;
		this.genericMessage = genericMessage;
	}
}

class ThirdPartyError extends Error {
	constructor(statusCode, detailedMessage) {
		const { message, genericMessage } = errorCodes[statusCode];
		super(message);
		this.name = this.constructor.name;
		this.status = statusCode;
		this.detailedMessage = detailedMessage;
		this.genericMessage = genericMessage;
	}
}

module.exports = { CustomErrorConstructor, AccountError, InternalError, UserError, ThirdPartyError };
