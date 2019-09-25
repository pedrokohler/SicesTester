require('dotenv').config();

const puppeteer = require('puppeteer');
const login = require('./services/login');

const masterUsername = process.env.MASTER_USERNAME;
const masterPassword = process.env.MASTER_PASSWORD;

(async () => {
    const browser = await puppeteer.launch();
    await login(browser, masterUsername, masterPassword);
    await browser.close();
})();