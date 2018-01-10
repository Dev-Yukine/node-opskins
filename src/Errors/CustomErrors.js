const errorCodes = require('./ErrorCodes.json');

/**
 * Abstracted Class to Construct CustomErrors
 * @abstract
 * @class
*/
class CustomErrorConstructor {
	/**
	 * The method to construct a CustomError from OPSkins API
	 * @param {Buffer} requestBody the body of the failed request
	 * @returns {AccountError|InternalError|UserError|ThirdPartyError}
	 */
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
	/**
	 * Creates a new Instance of this Error Class
	 * @param {number} statusCode the status code from the OPskins API
	 * @param {string} detailedMessage the status message from the OPSkins API
	 */
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
	/**
	 * Creates a new Instance of this Error Class
	 * @param {number} statusCode the status code from the OPskins API
	 * @param {string} detailedMessage the status message from the OPSkins API
	 */
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
	/**
	 * Creates a new Instance of this Error Class
	 * @param {number} statusCode the status code from the OPskins API
	 * @param {string} detailedMessage the status message from the OPSkins API
	 */
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
	/**
	 * Creates a new Instance of this Error Class
	 * @param {number} statusCode the status code from the OPskins API
	 * @param {string} detailedMessage the status message from the OPSkins API
	 */
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
