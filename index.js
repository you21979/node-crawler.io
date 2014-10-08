var req = require('./lib/req');
exports.CONSTANT = require('./lib/constant');
exports.CookieSession = require('./lib/cookie_session');
exports.setup = function(p){ req.setup(p); }
