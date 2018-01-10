const EventEmitter = require('events');
const Cashout = require('../Endpoints/ICashout.js');
const Inventory = require('../Endpoints/IInventory.js');
const Pricing = require('../Endpoints/IPricing.js');
const Sales = require('../Endpoints/ISales.js');
const Status = require('../Endpoints/IStatus.js');
const Support = require('../Endpoints/ISupport.js');
const Test = require('../Endpoints/ITest.js');
const User = require('../Endpoints/IUser.js');

/**
 * The Client to interact with the Opskins API
 * @class
 * @property {string} token the token for the OPskins API
 * @property {Cashout} cashout Cashout Interface
 * @property {Inventory} inventory Inventory Interface
 * @property {Pricing} pricing Pricing interface
 * @property {Sales} sales Sales interface
 * @property {Status} status Status Interface
 * @property {Support} support Support Interface
 * @property {Test} test Test Interface
 * @property {User} user User Interface
*/
module.exports = class Client extends EventEmitter {
	/**
	 * Creates a Client instance to interact with the the OPSkins API
	 * @param {string} token The API Token to log in with
	 */
	constructor(token) {
		super();
		if (!token || typeof token !== 'string') throw new TypeError('You didn\'t provided an token or it wasn\'t a string! || get one here http://bit.ly/2CMew9X');
		this.token = token;
		this.cashout = new Cashout(this);
		this.inventory = new Inventory(this);
		this.pricing = new Pricing(this);
		this.sales = new Sales(this);
		this.status = new Status(this);
		this.support = new Support(this);
		this.test = new Test(this);
		this.user = new User(this);
	}
};
