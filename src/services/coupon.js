require('dotenv').config();
require('colors');

const { clearInputField, tabChar, reloadPage } = require('./common');
const baseUrl = process.env.BASE_URL;

const functions = {

    test: async (page) =>{
        console.log("Testing coupon".green);

        const redirectLog = tabChar + " Going to" + " " + baseUrl + '/coupon';
        console.log(redirectLog.blue);

        await page.goto(baseUrl + '/coupon', {waitUntil: 'networkidle0'});

        const testCode = new Date().getTime()
        const originalCoupons = [
            {name: `Cupom teste ${testCode - 1111}`, value: '1000', context: 'todos', customer: null},
            {name: `Cupom teste ${testCode}`, value: '1300', context: 'kits', customer: null},
            {name: `Cupom teste ${testCode + 1111}`, value: '1500', context: 'orçamentos', customer: null}
        ]
        
        const codes = await functions.createForTest(page, originalCoupons);
        
        await functions.updateForTest(page, codes, originalCoupons);

        await functions.deleteForTest(page, codes);

    },

    getCodeByIndex: async (page, index) => {

        console.log(tabChar, 'Getting coupon code by name')
        let code = await page.evaluate((index)=>{
            const codeCols = document.querySelectorAll('td.col-code');
            return codeCols[index].innerText;
        }, index);

        return code;
    },

    findCouponByName: async (page, name) => {
        console.log(tabChar, 'Searching coupon by name')
        let delIndex = await page.evaluate((name)=>{
            const nameCols = document.querySelectorAll('td.col-name');

            for(let i = 0; i < nameCols.length; i++){
                if(nameCols[i].innerText.toLowerCase() === name.toLowerCase()){
                    return i;
                }
            }

        }, name);

        return typeof delIndex != 'undefined' ? delIndex : -1;

    },

    findCouponByCode: async (page, code) => {
        console.log(tabChar, 'Searching coupon by code');

        let delIndex = await page.evaluate((code)=>{
            const codeCols = document.querySelectorAll('td.col-code');

            for(let i = 0; i < codeCols.length; i++){
                if(codeCols[i].innerText.toLowerCase() === code.toLowerCase()){
                    return i;
                }
            }

        }, code);

        return typeof delIndex != 'undefined' ? delIndex : -1;
    },
    
    createForTest: async (page, coupons) =>{
        console.log(tabChar, 'Creating coupons'.blue);
        const codes = [];
        
        for(let i = 0; i < coupons.length; i++){
            const coupon = coupons[i];
            
            await functions.create(page, coupon);
        }

        await reloadPage(page);

        for(let i = 0; i < coupons.length; i++){
            const coupon = coupons[i];
            const index = await functions.findCouponByName(page, coupon.name);
            const code = await functions.getCodeByIndex(page, index);
    
            codes.push(code);
        }
    
        console.log(tabChar, "Taking screenshot");
        await page.screenshot({path: 'results/coupon/create.png'});

        return codes;
    },

    updateForTest: async (page, codes, originalCoupons) =>{
        console.log(tabChar, 'Updating coupons'.blue);

        for(let i = 0; i < codes.length; i++){
            const newCoupon = Object.assign(originalCoupons[i]);
            const code = codes[i];
            
            newCoupon.value = (Number(originalCoupons[i].value) + 1000 + i).toString();

            await functions.update(page, code, newCoupon);
        }

        await reloadPage(page);

        console.log(tabChar, "Taking screenshot");
        await page.screenshot({path: 'results/coupon/update.png'});
        
    },

    deleteForTest: async (page, codes)=>{
        console.log(tabChar, 'Deleting coupons'.blue);

        for(let i = 0; i < codes.length; i++){
            const code = codes[i];            
            await functions.delete(page, code);
        }

        await reloadPage(page);

        console.log(tabChar, "Taking screenshot");
        await page.screenshot({path: 'results/coupon/delete.png'});

    },

    create: async (page, {name, value, context, customer}) =>{
        console.log(tabChar, "Clicking button");
        await page.$eval('header > div > button[data-v-dfed523c]', button => button.click());

        await functions.formEdit(page, name, value, context, customer);

        console.log(tabChar, "Clicking button");
        await page.$eval('footer > button[data-v-685d3e86]', button => button.click());

    },

    update: async(page, code, {name, value, context, customer}) =>{
        const index = await functions.findCouponByCode(page, code);
        
        console.log(tabChar, "Clicking button");

        await page.evaluate((index) => {
            const updateButtons = document.querySelectorAll('td > nav > button.primary-common.first');

            updateButtons[index].click();

        }, index);

        await functions.formEdit(page, name, value, context, customer);

        console.log(tabChar, "Clicking button");
        await page.$eval('footer > button[data-v-685d3e86]', button => button.click());
        

    },

    delete: async(page, code) =>{
        const index = await functions.findCouponByCode(page, code);

        console.log(tabChar, "Clicking button");

        await page.evaluate((index) => {
            const deleteButtons = document.querySelectorAll('td > nav > button.danger-common.last');

            deleteButtons[index].click();

        }, index);

        console.log(tabChar, "Clicking button");
        await page.$eval('footer > button.danger-common', button => button.click());
    },

    formEdit: async(page, name, value, context, customer) =>{        

        await page.focus("input.field");
        await clearInputField(page);
        await page.keyboard.type(name);
        await page.keyboard.press("Tab");
        await clearInputField(page);
        await page.keyboard.type(value);
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        context === 'kits' 
            ? await page.keyboard.press("k") 
            : (context === 'orçamentos' 
                ? await page.keyboard.press("o") 
                : await page.keyboard.press("t"));
        await page.keyboard.press("Enter");

    },
}

module.exports = functions;