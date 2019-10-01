require('colors');

const { clearInputField, tabChar, reloadPage, goto: goTo } = require('./common');

const functions = {
    test: async (page) => {
        console.log("Testing orders".green);
        
        await goTo(page, '/orders');

        await functions.create(page);
    
        // console.log(tabChar, "Taking screenshot");
        // await page.screenshot({path: 'results/order/teste.png'});

    },

    create: async (page) => {        
        await goTo(page, '/twig/project/generator/');
    
        console.log(tabChar, "Taking screenshot");
        await page.screenshot({path: 'results/order/teste.png'});

    }
};

module.exports = functions;