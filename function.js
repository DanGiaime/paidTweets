const puppeteer = require('puppeteer');
const {fullLoginFlow, sleep} = require('./pages/login');
const {USERNAME, PASSWORD} = require('./secrets');
const {scrollUntilFindUsernames} = require('./pages/singleTweet');


let makeScreenPhoneSize = async (page) => {
  await page.setViewport({ width: 660, height: 1000 });
};

exports.start = async (req, res) => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  let tweetURL = req.body.tweetURL;
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
  if(!usernames) {
    res.status(404);
  }
  else {  
    res.send(usernames); 
  }
};

