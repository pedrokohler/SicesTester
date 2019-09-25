require('dotenv').config();
const rootUrl = process.env.BASE_URL;

const functions = {
    openMainPage: async (browser) => {

        console.log("Opening new page");
        const page = await browser.newPage();
        console.log("Going to", rootUrl);
        await page.goto(rootUrl);
        console.log("Setting default viewport");
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
        console.log("Clearing input field")
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');

    },
}


module.exports = functions;