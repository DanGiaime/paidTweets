const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://twitter.com');
  await page.screenshot({path: 'twitter.png'});

  await browser.close();
})();

