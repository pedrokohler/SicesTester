const openMainPage = require('./common').openMainPage;


module.exports = async (browser, username, password) => {
    const page = await openMainPage(browser);
    await page.focus('#username');
    await page.keyboard.type(username);
    await page.focus('#password');
    await page.keyboard.type(password);
    await page.$eval('form', form => form.submit());
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'results/dashboard.png' });
    await page.close();
}