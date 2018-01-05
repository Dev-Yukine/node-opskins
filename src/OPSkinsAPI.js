module.exports = class OPSkinsAPI {
	constructor(key) {
		this.key = key;
		this.cashout = require('./Endpoints/ICashout.js');
		this.inventory = require('./Endpoints/IInventory.js');
		this.pricing = require('./Endpoints/IPricing.js');
		this.sales = require('./Endpoints/ISales.js');
		this.status = require('./Endpoints/IStatus.js');
		this.support = require('./Endpoints/ISupport.js');
		this.test = require('./Endpoints/ITest.js');
		this.user = require('./Endpoints/IUser.js');
	}
};
