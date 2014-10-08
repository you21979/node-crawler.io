var r = require('./req');
var rp = r.req.bind(r);
var CONSTANT = require('./constant');

var CookieSession = module.exports = function(userAgent){
    if(!userAgent) userAgent = CONSTANT.USER_AGENT;
    this.cookies = [];
    this.defaultHeader = {
        'User-Agent': userAgent,
    };
}

var mergeObject = function(params){
    return params.reduce(function(r, v){
        Object.keys(v).forEach(function(k){ r[k] = v[k]; });
        return r;
    },{})
}

CookieSession.prototype.postLogin = function(url, auth){
    var self = this;
    return rp({
        'headers': mergeObject([this.defaultHeader,{
            'Content-Type': 'application/x-www-form-urlencoded',
        }]),
        'method': 'POST',
        'form': auth,
        'resolveWithFullResponse': true,
        'url': url
    }).then(function(fullres){
        self.cookies = fullres['headers']['set-cookie'];
        self.defaultHeader['Cookie'] = self.cookies.map(function(v){return v.split(';').shift()});
        return fullres['body'];
    })
}

CookieSession.prototype.get = function(url){
    return rp({
        'headers': this.defaultHeader,
        'method': 'GET',
        'url': url,
    })
}
CookieSession.prototype.getBinary = function(url){
    return rp({
        'headers': this.defaultHeader,
        'method': 'GET',
        'encoding':'binary',
        'url': url,
    }).then(function(v){ return new Buffer(v, 'binary') })
}
CookieSession.prototype.post = function(url, param){
    return rp({
        'headers': mergeObject([this.defaultHeader,{
            'Content-Type': 'application/x-www-form-urlencoded',
        }]),
        'method': 'POST',
        'form': param,
        'url': url,
    })
}
