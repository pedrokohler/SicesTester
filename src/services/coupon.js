require('dotenv').config();

const { clearInputField, tabChar } = require('./common');
const baseUrl = process.env.BASE_URL;

module.exports = {

    test: async (page) =>{
        console.log("Testing coupon");
        this.create(page);
        await page.screenshot({path: 'results/coupon/create.png'});

    },

    create: async (page) =>{
        
        console.log(tabChar, "Going to", baseUrl + '/coupon');
        await page.goto(baseUrl + '/coupon', {waitUntil: 'networkidle0'});
        console.log(tabChar, "Clicking button");
        await page.$eval('header > div > button[data-v-dfed523c]', button => button.click());

        await page.focus("input.field");
        await clearInputField(page);
        await page.keyboard.type(`Cupom teste ${new Date().getTime()}`);
        await page.keyboard.press("Tab");
        await clearInputField(page);
        await page.keyboard.type("1000");

        await page.$eval('footer > button[data-v-685d3e86]', button => button.click());

    },
}