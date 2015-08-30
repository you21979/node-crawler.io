var r = require('./req');
var rp = r.req.bind(r);
var CONSTANT = require('./constant');


var mergeObject = function(params){
    return params.reduce(function(r, v){
        Object.keys(v).forEach(function(k){ r[k] = v[k]; });
        return r;
    },{})
}

var fullRequest = function(opt){
    return rp(mergeObject([opt,{'resolveWithFullResponse': true}])).
        then(function(res){
            return [res, 200];
        }).catch(function(err){
            if(err.statusCode === 302){
                return [err['response'], 302];
            }else{
                throw err
            }
        })
}

var thenFullRequestProcess = function(self){
    return function(res){
        var fullres = res[0];
        var code = res[1];
        if('set-cookie' in fullres['headers']){
            self.cookies = fullres['headers']['set-cookie'];
            self.defaultHeader['Cookie'] = self.cookies.map(function(v){return v.split(';').shift()});
        }
        if(code === 302){
            return self.get(fullres['headers']['location'])
        }
        return fullres['body'];
    }
}

var CookieSession = module.exports = function(userAgent){
    if(!userAgent) userAgent = CONSTANT.USER_AGENT;
    this.cookies = [];
    this.defaultHeader = {
        'User-Agent': userAgent,
    };
}

CookieSession.prototype.get = function(url){
    return fullRequest({
        'headers': this.defaultHeader,
        'method': 'GET',
        'url': url,
    }).then(thenFullRequestProcess(this))
}

CookieSession.prototype.post = function(url, param){
    return fullRequest({
        'headers': mergeObject([this.defaultHeader,{
            'Content-Type': 'application/x-www-form-urlencoded',
        }]),
        'method': 'POST',
        'form': param,
        'url': url,
    }).then(thenFullRequestProcess(this))
}

CookieSession.prototype.getBinary = function(url){
    return rp({
        'headers': this.defaultHeader,
        'method': 'GET',
        'encoding':'binary',
        'url': url,
    }).then(function(v){ return new Buffer(v, 'binary') })
}

// duplicated
CookieSession.prototype.postLogin = CookieSession.prototype.post;

