require('dotenv').config();

const { openMainPage, clearInputField, logout, tabChar } = require('./common');

module.exports = {
    sucessfulLogin: async (browser, username, password) => {
        console.log("Testing a sucessful login");
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
        console.log("Testing an unsucessful login");
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

    logout: async (page) => {
        console.log("Testing a logout");
        await logout(page);
    },

}