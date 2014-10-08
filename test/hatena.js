var CookieSession = require('../lib/cookie_session');
var c = new CookieSession();
var auth = {
    name:process.env['ID'],
    password:process.env['PASS'],
};
c.postLogin('https://www.hatena.ne.jp/login', auth).then(function(res){
    if( res.match(/が違います/) ){
        throw new Error('login error');
    }
    return c.get('http://b.hatena.ne.jp/my')
}).then(console.log)
