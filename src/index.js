require('dotenv').config();

const puppeteer = require('puppeteer');
const login = require('./services/login');

const masterUsername = process.env.MASTER_USERNAME;
const masterPassword = process.env.MASTER_PASSWORD;

(async () => {
    const browser = await puppeteer.launch();
    const page = await login.sucessfulLogin(browser, masterUsername, masterPassword);

    await login.logout(page);
    await page.close();
    await login.unsucessfulLogin(browser);
    await browser.close();
})();