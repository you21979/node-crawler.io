var CookieSession = require('..').CookieSession;
var c = new CookieSession("UserAgent : (I am a Bot.)");

var loginParam = {
    name:process.env['ID'],
    password:process.env['PASS'],
};

c.get('https://www.hatena.ne.jp/').then(function(res){
    return c.postLogin('https://www.hatena.ne.jp/login', loginParam).then(function(res){
        if( res.match(/が違います/) ){
            throw new Error('login error');
        }
        return c.get('http://b.hatena.ne.jp/my')
    }).then(function(res){
        console.log(res)
    })
}).catch(function(err){
    console.log("err")
})
