const puppeteer = require('puppeteer');
const {fullLoginFlow, sleep} = require('../pages/login');
const {USERNAME, PASSWORD} = require('../secrets');
const {scrollUntilFindUsernames} = require('../pages/singleTweet');


let makeScreenPhoneSize = async (page) => {
  await page.setViewport({ width: 660, height: 1000 });
};

let findRetweeters = async (tweetURL) => {
  const browser = await puppeteer.launch({headless: true});

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')

  //const tweetURL = "https://twitter.com/roxkstar74/status/1346145124686946304/retweets";

  // load login page as phone
  await page.goto('https://www.twitter.com/login');
  await makeScreenPhoneSize(page);

  // login to our account
  await fullLoginFlow(page, USERNAME, PASSWORD);
  await sleep(2000);

  // navigate to the actual tweet page retweets
  // await page.goto(tweeterProfile);
  await page.goto(tweetURL);
  await sleep(2000);

  let usernames = await scrollUntilFindUsernames(page);
  // console.log(postLink);
  // let tweetInfo = await getAllTweetInfo(page);
  console.log(usernames);
  await sleep(2000);



  // pull all needed info from the page


  await browser.close();
  return usernames;
};

module.exports = {findRetweeters};
