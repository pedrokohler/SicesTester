require('dotenv').config();
const baseUrl = process.env.BASE_URL;
const tabChar = "   ";

const functions = {
    openMainPage: async (browser) => {

        console.log(tabChar, "Opening new page");
        const page = await browser.newPage();
        console.log(tabChar, "Going to", baseUrl);
        await page.goto(baseUrl);
        console.log(tabChar, "Setting default viewport");
        await functions.setDefaultViewport(page);

        return page;
    },

    setDefaultViewport: async (page) => {
        await page.setViewport({
            width: 1366,
            height: 768,
            deviceScaleFactor: 1,
        });
    },

    clearInputField: async (page) => {
        console.log(tabChar, "Clearing input field")
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');

    },

    logout: async (page) => {
        console.log(tabChar, "Logging out");
        await page.goto(baseUrl + '/logout');
    },

    tabChar: tabChar,
}


module.exports = functions;