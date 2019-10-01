require('dotenv').config();

const tabChar = "   ";
const baseUrl = process.env.BASE_URL;


const functions = {
    openMainPage: async (browser) => {
        
        const pageOpeningLog = tabChar + " Opening new page";
        console.log(pageOpeningLog.blue);
        const page = await browser.newPage();

        await functions.goto(page, '');

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
        await functions.goto(page, '/logout');
    },

    reloadPage: async(page) =>{        
        console.log(tabChar, "Reloading page");
        await page.reload({waitUntil: "networkidle0"});
    },

    goto: async (page, path) => {
        
        const mainUrl = baseUrl + path;
        const redirectLog = tabChar + " Going to" + " " + mainUrl;
        console.log(redirectLog.blue);

        await page.goto(mainUrl, {waitUntil: 'networkidle0'});
    },

    tabChar: tabChar,
};


module.exports = functions;