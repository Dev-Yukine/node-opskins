const { AccountError, InternalError, UserError, ThirdPartyError } = require('./Errors/CustomErrors.js');

module.exports = {
	// Client
	Client: require('.Client/Client.js'),

	// Errors
	AccountError,
	InternalError,
	UserError,
	ThirdPartyError
};
