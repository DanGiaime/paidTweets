const {sleep} = require('./login');

let getAllTweetInfo = async (page, desiredAPath) => {
    const retweets = await page.evaluate(async (desiredAPath) => {
        await new Promise(resolve => setTimeout(resolve, 5000));

        let dataEncapsulatingElement = document.querySelector(`a[href="${desiredAPath}"]`);
        return Array.from(dataEncapsulatingElement.querySelectorAll('[data-testid="retweet"]'), ({ textContent }) => textContent)
    }, desiredAPath);
    const replies = await page.evaluate(async (desiredAPath) => {
        await new Promise(resolve => setTimeout(resolve, 5000));

        let dataEncapsulatingElement = document.querySelector(`a[href="${desiredAPath}"]`);
        return Array.from(dataEncapsulatingElement.querySelectorAll('[data-testid="reply"]'), ({ textContent }) => textContent)
    }, desiredAPath);
    const likes = await page.evaluate(async (desiredAPath) => {
        await new Promise(resolve => setTimeout(resolve, 5000));

        let dataEncapsulatingElement = document.querySelector(`a[href="${desiredAPath}"]`);
        return Array.from(dataEncapsulatingElement.querySelectorAll('[data-testid="like"]'), ({ textContent }) => textContent)
    }, desiredAPath);
      

    return {
        retweets,
        replies,
        likes
    };
}

let scrollUntilFindUsernames = async (page) => {
    

    return await page.evaluate(async () => {
        for(let i = 0; i < 20; i++) {
            window.scrollBy(0, window.innerHeight);
            await new Promise(resolve => setTimeout(resolve, 1000));
            // First indication of finding the right tweet on the profile
            // let postLink = document.querySelector(`a[href="${desiredAPath}"]`);

            // // go up to the parent of the posts so that we an go back down to find the retweet and like info
            // if(postLink) {
            //     let dataEncapsulatingElement = document.querySelector(`a[href="${desiredAPath}"]`).parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[2];
            //     return {
            //         retweets: Array.from(dataEncapsulatingElement.querySelectorAll('[data-testid="retweet"]'), ({ textContent }) => textContent),
            //         replies: Array.from(dataEncapsulatingElement.querySelectorAll('[data-testid="reply"]'), ({ textContent }) => textContent),
            //         likes: Array.from(dataEncapsulatingElement.querySelectorAll('[data-testid="like"]'), ({ textContent }) => textContent),
            //     }
            // };

            // return Array.from(dataEncapsulatingElement.querySelectorAll('[data-testid="retweet"]'), ({ textContent }) => textContent)
        }

        // return list of usernames
        return Array.from(document.querySelectorAll('div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs > a > div > div.css-1dbjc4n.r-18u37iz.r-1wbh5a2 > div > span')).map(x => x.textContent).filter(x => x.indexOf("@") > -1);
    });

    
}

module.exports = {
    getAllTweetInfo,
    scrollUntilFindUsernames
}