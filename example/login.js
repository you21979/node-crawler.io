require('..').setup([{
 host:"https://www.hatena.ne.jp",max:10,sec:1,
}]);
var CookieSession = require('..').CookieSession;
var c = new CookieSession();
//var c = new CookieSession("UserAgent : (I am a Bot.)");

var loginParam = {
    name:process.env['ID'],
    password:process.env['PASS'],
};

return c.post('https://www.hatena.ne.jp/login', loginParam).then(function(res){
    if( res.match(/が違います/) ){
        throw new Error('login error');
    }
    console.log(res)
}).catch(function(err){
    console.log("err")
})

