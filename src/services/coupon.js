require('dotenv').config();

const { clearInputField, tabChar, reloadPage } = require('./common');
const baseUrl = process.env.BASE_URL;

const functions = {

    test: async (page) =>{
        console.log("Testing coupon");
        
        await functions.create(page);
        await reloadPage(page);
        console.log(tabChar, "Taking screenshot");
        await page.screenshot({path: 'results/coupon/create.png'});

        await functions.update(page);
        await reloadPage(page);
        console.log(tabChar, "Taking screenshot");
        await page.screenshot({path: 'results/coupon/update.png'});

        await functions.delete(page);
        await reloadPage(page);
        console.log(tabChar, "Taking screenshot");
        await page.screenshot({path: 'results/coupon/delete.png'});

    },

    create: async (page) =>{
        
        console.log(tabChar, "Going to", baseUrl + '/coupon');
        await page.goto(baseUrl + '/coupon', {waitUntil: 'networkidle0'});
        console.log(tabChar, "Clicking button");
        await page.$eval('header > div > button[data-v-dfed523c]', button => button.click());

        await functions.formEdit(page, `Cupom teste ${new Date().getTime()}`, '1000');

        console.log(tabChar, "Clicking button");
        await page.$eval('footer > button[data-v-685d3e86]', button => button.click());

    },

    update: async(page) =>{
        console.log(tabChar, "Clicking button");
        await page.$eval('td > nav > button', button => button.click());

        await functions.formEdit(page, `Cupom teste ${new Date().getTime()}`, '1200');

        console.log(tabChar, "Clicking button");
        await page.$eval('footer > button[data-v-685d3e86]', button => button.click());
        

    },

    delete: async(page) =>{
        console.log(tabChar, "Clicking button");
        await page.$eval('td > nav > button.danger-common', button => button.click());

        console.log(tabChar, "Clicking button");
        await page.$eval('footer > button.danger-common', button => button.click());
    },

    formEdit: async(page, name, value) =>{        

        await page.focus("input.field");
        await clearInputField(page);
        await page.keyboard.type(name);
        await page.keyboard.press("Tab");
        await clearInputField(page);
        await page.keyboard.type(value);

    },
}

module.exports = functions;