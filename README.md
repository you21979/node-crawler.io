# node-crawler.io

web crawler i/o

## install

```
npm install crawler.io
```

## example

### Simple Usage

```
var CookieSession = require('crawler.io').CookieSession;
var c = new CookieSession("UserAgent : (I am a Bot.)");
c.get('http://www.yahoo.co.jp/').then(function(res){
    console.log(res)
}).catch(function(err){
    console.log("err")
})
```

### Login Session

```
var CookieSession = require('crawler.io').CookieSession;
var c = new CookieSession("UserAgent : (I am a Bot.)");

var loginParam = {
    name:process.env['ID'],
    password:process.env['PASS'],
};

c.get('https://www.hatena.ne.jp/').then(function(res){
    return c.post('https://www.hatena.ne.jp/login', loginParam).then(function(res){
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
```

command

```
ID=username PASS=password node login.js
```


## license

MIT

