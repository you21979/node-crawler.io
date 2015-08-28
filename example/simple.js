var CookieSession = require('..').CookieSession;
var c = new CookieSession("UserAgent : (I am a Bot.)");
c.get('http://www.yahoo.co.jp/').then(function(res){
    console.log(res)
}).catch(function(err){
    console.log("err")
})
