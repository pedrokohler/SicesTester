require('dotenv').config();

const { openMainPage, clearInputField, logout, tabChar } = require('./common');

const functions = {
    test: async (browser, username, password) => {        
        const page = await functions.sucessfulLogin(browser, username, password);
        await functions.logout(page);
        await page.close();
    },

    sucessfulLogin: async (browser, username, password) => {
        console.log("Testing a sucessful login".green);
        const page = await openMainPage(browser);

        await page.focus('#username');
        await clearInputField(page);
        await page.keyboard.type(username);
        await page.focus('#password');
        await clearInputField(page);
        await page.keyboard.type(password);
        console.log(tabChar, "Submitting form");
        await page.$eval('form', form => form.submit());
        console.log(tabChar, "Waiting for network to be idle");
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        console.log(tabChar, "Taking screenshot");
        await page.screenshot({ path: 'results/dashboard.png' });

        return page;
    },

    unsucessfulLogin: async (browser) => {
        console.log("Testing an unsucessful login".green);
        const page = await openMainPage(browser);

        await page.focus('#username');
        await clearInputField(page);
        await page.keyboard.type('fakeusername@fakeemail.com');
        await page.focus('#password');
        await clearInputField(page);
        await page.keyboard.type('wrongpassword');
        console.log(tabChar, "Submitting form");
        await page.$eval('form', form => form.submit());
        console.log(tabChar, "Taking screenshot");
        await page.screenshot({ path: 'results/login-fail.png' });
        console.log(tabChar, "Closing page");
        await page.close();
    },

    quickLogin: async (browser, username, password) => {
        console.log("Making quick login".green);
        const page = await openMainPage(browser);

        await page.focus('#username');
        await clearInputField(page);
        await page.keyboard.type(username);
        await page.focus('#password');
        await clearInputField(page);
        await page.keyboard.type(password);
        console.log(tabChar, "Submitting form");
        await page.$eval('form', form => form.submit());
        console.log(tabChar, "Waiting for dom content");
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        return page;
    },

    logout: async (page) => {
        console.log("Testing a logout".green);
        await logout(page);
    },

};

module.exports = functions;