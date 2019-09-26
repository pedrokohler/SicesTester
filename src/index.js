require('dotenv').config();

const puppeteer = require('puppeteer');
const login = require('./services/login');
const coupon = require('./services/coupon');

const masterUsername = process.env.MASTER_USERNAME;
const masterPassword = process.env.MASTER_PASSWORD;

(async () => {
    const browser = await puppeteer.launch();
    // const page = await login.sucessfulLogin(browser, masterUsername, masterPassword);
    const page = await login.quickLogin(browser, masterUsername, masterPassword);

    await coupon.test(page);

    await login.logout(page);
    await page.close();
    // await login.unsucessfulLogin(browser);
    await browser.close();
})();