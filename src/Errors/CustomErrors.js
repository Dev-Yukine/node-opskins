const errorCodes = require('./ErrorCodes.json');

class CustomErrorConstructor {
	static construct(errorCode) {
		if (errorCode > 1000 && errorCode < 2000) {
			return new AccountError(errorCode);
		} else if (errorCode >= 2000 && errorCode < 3000) {
			return new InternalError(errorCode);
		} else if (errorCode >= 3000 && errorCode < 4000) {
			return new UserError(errorCode);
		} else if (errorCode >= 4000 && errorCode < 5000) {
			return new ThirdPartyError(errorCode);
		}
	}
}

class AccountError extends Error {
	constructor(errorCode) {
		const { message, detailedMessage } = errorCodes[errorCode];
		super(message);
		this.status = errorCode;
		this.detailedMessage = detailedMessage;
	}
}

class InternalError extends Error {
	constructor(errorCode) {
		const { message, detailedMessage } = errorCodes[errorCode];
		super(message);
		this.status = errorCode;
		this.detailedMessage = detailedMessage;
	}
}

class UserError extends Error {
	constructor(errorCode) {
		const { message, detailedMessage } = errorCodes[errorCode];
		super(message);
		this.status = errorCode;
		this.detailedMessage = detailedMessage;
	}
}

class ThirdPartyError extends Error {
	constructor(errorCode) {
		const { message, detailedMessage } = errorCodes[errorCode];
		super(message);
		this.status = errorCode;
		this.detailedMessage = detailedMessage;
	}
}

module.exports = { CustomErrorConstructor, AccountError, InternalError, UserError, ThirdPartyError };
