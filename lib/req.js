var LimitRequestPromise = require('limit-request-promise');
var lrp = module.exports = new LimitRequestPromise(1, 1);
