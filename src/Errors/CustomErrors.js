class ErrorCodes { // TODO finsih detailedMessage and add all missing error codes
	static get codes() {
		return {
			1000: {
				message: 'GENERIC_USER_ACCOUNT_ERROR',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable.'
			},
			1001: {
				message: 'NOT_ENOUGH_COINS',
				detailedMessage: 'This code indicates that the operation failed because your account balance is insufficient (we refer to funds as "coins" internally).'

			},
			1002: {
				message: 'ACCESS_DENIED',
				detailedMessage: 'The operation failed because your account does not have necessary permissions'
			},
			1003: {
				message: 'NOT_LOGGED_IN',
				detailedMessage: 'The operation failed because you are not authenticated.'
			},
			1004: {
				message: 'LISTING_LIMIT_EXCEEDED',
				detailedMessage: 'The operation failed because you have too many items listed under your account.'
			},
			1005: {
				message: 'NO_MORE_FREE_USES',
				detailedMessage: 'The operation failed because you tried to use a paid feature for free (e.g. you tried to feature an item using a free featured listing from a subscription purchase), but your account has no more free uses of that item.'
			},
			1006: {
				message: 'INVALID_PASSWORD',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable'
			},
			1007: {
				message: 'PASSWORD_UNSET',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable'
			},
			1008: {
				message: 'TOO_MANY_PASSWORD_ATTEMPTS',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable'
			},
			1009: {
				message: 'UNACCEPTABLE_PASSWORD',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable'
			},
			1010: {
				message: 'TWOFACTOR_INCORRECT',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable'
			},
			1011: {
				message: 'USERNAME_TAKEN',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable'
			},
			1012: {
				message: 'UNACCEPTABLE_USERNAME',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable'
			},
			1013: {
				message: 'EMAIL_UNVERIFIED',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable'
			},
			1014: {
				message: 'NO_MORE_FREE_USES',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable'
			},
			1015: {
				message: 'UNACCEPTABLE_EMAIL',
				detailedMessage: 'This code indicates that there was a generic error which involved a problem with your user account. Further details are unavailable'
			}
		};
	}
}

class CustomErrorConstructor {
	static construct(errorCode) {
		if (errorCode > 1 && errorCode < 2000) {
			return new AccountError(errorCode);
		} else if (errorCode >= 2000 && errorCode < 3000) {
			return new InternalError(errorCode);
		}
	}
}

class AccountError extends Error {
	constructor(errorCode) {
		super();
		const { message, detailedMessage } = ErrorCodes.codes[errorCode];
		this.message = message;
		this.detailedMessage = detailedMessage;
	}
}

class InternalError extends Error {
	constructor(errorCode) {
		super();
		const { message, detailedMessage } = ErrorCodes.codes[errorCode];
		this.message = message;
		this.detailedMessage = detailedMessage;
	}
}

class UserError extends Error {
	constructor(errorCode) {
		super();
		const { message, detailedMessage } = ErrorCodes.codes[errorCode];
		this.message = message;
		this.detailedMessage = detailedMessage;
	}
}

class ThirdPartyError extends Error {
	constructor(errorCode) {
		super();
		const { message, detailedMessage } = ErrorCodes.codes[errorCode];
		this.message = message;
		this.detailedMessage = detailedMessage;
	}
}

module.exports = { ErrorCodes, CustomErrorConstructor, AccountError, InternalError, UserError, ThirdPartyError };
