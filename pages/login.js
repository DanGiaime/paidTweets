let earthCookie;

let getLikeURLS = () => {
    const URLs = Array.from(document.querySelectorAll('.css-4rbku5.css-18t94o4.css-1dbjc4n.r-1loqt21.r-1wbh5a2.r-dnmrzs.r-1ny4l3l'), ({ href }) => href);
    return URLs;
}

let waitForTweetsToLoadAndScroll = () => {
    let i = 0;
    //TODO: Set Interval
    window.scrollTo(0, i += screen.height);
};

let fillInUsername = (username) => {
    document.querySelector('[name="session[username_or_email]"]').value = username;
}

let fillInPassword = (password) => {
    document.querySelector('[name="session[password]"]').value = password;
}

let clickLogin = () => {
    document.querySelector('[data-testid="LoginForm_Login_Button"]').click();
};

let handleCookies = async () => {
    earthCookie = await page.GetCookiesAsync();
    await page.setCookie(earthCookie);
}

module.exports = {
    getLikeURLS,
    waitForTweetsToLoadAndScroll,
    fillInUsername,
    fillInPassword,
    clickLogin,
    handleCookies
}