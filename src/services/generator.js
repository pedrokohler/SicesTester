require('dotenv').config();
require('colors');

const { clearInputField, tabChar, reloadPage } = require('./common');
const baseUrl = process.env.BASE_URL;

const functions = {

    test: async (page) => {
        console.log("Testing generator".green);

        const mainUrl = baseUrl + '/twig/project/generator/';
        const redirectLog = tabChar + " Going to" + " " + mainUrl;
        console.log(redirectLog.blue);

        await page.goto(mainUrl, { waitUntil: ['networkidle0', 'domcontentloaded'] });

        console.log(tabChar, 'Waiting for iframe');
        await page.waitForSelector(`div.app-page-main-wrapper > div.frameview > iframe`);

        const frame = await functions.getFrame(page);
        await functions.formEdit(page, frame, "100");

        console.log(tabChar, "Taking screenshot");
        await page.screenshot({ path: 'results/generator/test.png' });

        await functions.reloadIframe(frame)

        await functions.formEdit(page, frame, "200");

        console.log(tabChar, "Taking screenshot");
        await page.screenshot({ path: 'results/generator/test2.png' });
    },

    getCodeByIndex: async (page, index) => {

    },

    findCouponByName: async (page, name) => {

    },

    findCouponByCode: async (page, code) => {

    },

    createForTest: async (page, coupons) => {

    },

    updateForTest: async (page, codes, originalCoupons) => {

    },

    deleteForTest: async (page, codes) => {

    },

    create: async (page, { name, value, context, customer }) => {


    },

    update: async (page, code, { name, value, context, customer }) => {

    },

    delete: async (page, code) => {

    },

    reloadIframe: async (frame) => {


        console.log(tabChar, "Clicking button");
        await frame.$eval('#expand-generator', button => button.click());

        console.log(tabChar, "Waiting iframe reload");
        await frame.waitForSelector('#gerador.in');
    },

    getFrame: async (page) => {

        console.log(tabChar, 'Selecting iframe');
        const elementHandle = await page.$(
            `div.app-page-main-wrapper > div.frameview > iframe`
        );

        console.log(tabChar, 'Getting frame');
        const frame = await elementHandle.contentFrame();

        return frame;
    },

    formEdit: async (page, frame, value) => {

        await frame.focus('#generator_power');
        await clearInputField(page);
        await page.keyboard.type(value);
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('s');
        await page.keyboard.press('s');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('t');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        await page.keyboard.press('Enter');

        console.log(tabChar, "Waiting calculation");
        await frame.waitForSelector('#insurances');
    },
}

module.exports = functions;