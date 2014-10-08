var CookieSession = require('../lib/cookie_session');
var htmlparser = require("htmlparser");
var c = new CookieSession();
var auth = {
    name:process.env['ID'],
    password:process.env['PASS'],
};

var domfilter = function(dom, key, value){
    return dom.filter(function(v){return v[key] ? true : false}).
        filter(function(v){return v[key] === value})
}

c.postLogin('https://www.hatena.ne.jp/login', auth).then(function(res){
    var userid = '';
    var h = new htmlparser.DefaultHandler(function(err, dom){
        try{
            userid = domfilter(dom, 'name', 'html').reduce(function(r,v){
                return domfilter(v.children, 'name', 'body')
            },{}).reduce(function(r,v){
                return domfilter(v.children, 'name', 'div').filter(function(v){
                    return v.attribs['id'] === 'container';
                })
            },{}).reduce(function(r,v){
                return domfilter(v.children, 'name', 'div').filter(function(v){
                    return v.attribs['id'] === 'body';
                })
            },{}).reduce(function(r,v){
                return domfilter(v.children, 'name', 'div').filter(function(v){
                    return v.attribs['class'] === 'progress-message';
                })
            },{}).reduce(function(r,v){
                return domfilter(v.children, 'name', 'p')
            },{}).reduce(function(r,v){
                return domfilter(v.children, 'name', 'span');
            },{}).reduce(function(r,v){
                return v.children[0].data.split(' ').shift();
            },{})
        }catch(e){
            throw new Error('login error');
        }
    });
    var p = new htmlparser.Parser(h).parseComplete(res);
    return c.get('http://b.hatena.ne.jp/my')
})//.then(console.log)
