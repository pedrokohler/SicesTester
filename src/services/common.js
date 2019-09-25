require('dotenv').config();
const rootUrl = process.env.BASE_URL;

const functions = {
    openMainPage: async (browser) => {

        const page = await browser.newPage();
        await page.goto(rootUrl);
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
}


module.exports = functions;