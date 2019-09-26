require('dotenv').config();

const puppeteer = require('puppeteer');
const login = require('./services/login');
const coupon = require('./services/coupon');

const masterUsername = process.env.MASTER_USERNAME;
const masterPassword = process.env.MASTER_PASSWORD;
const integradorUsername = process.env.INTEGRADOR_USERNAME;
const integradorPassword = process.env.INTEGRADOR_PASSWORD;

(async () => {
    const browser = await puppeteer.launch();
    await login.test(browser, integradorUsername, integradorPassword);

    let page = await login.quickLogin(browser, masterUsername, masterPassword);
    await coupon.test(page);
    await page.close();

    await browser.close();
})();