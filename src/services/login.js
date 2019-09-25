require('dotenv').config();

const { openMainPage, clearInputField } = require('./common');
const baseUrl = process.env.BASE_URL;


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
        console.log("Submitting form");
        await page.$eval('form', form => form.submit());
        console.log("Waiting for network to be idle");
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        console.log("Taking screenshot");
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
        console.log("Submitting form");
        await page.$eval('form', form => form.submit());
        console.log("Taking screenshot");
        await page.screenshot({ path: 'results/login-fail.png' });
        console.log("Closing page");
        await page.close();
    },

    logout: async (page) => {
        console.log("Logging out");
        await page.goto(baseUrl + '/logout');
    }

}