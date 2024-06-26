/* ────────────────────────────────────────────────────────────────────────── */
/*                             Author: Cole Shanta                            */
/* ────────────────────────────────────────────────────────────────────────── */

//* ───────────────────────────── Import Modules ───────────────────────────── */
const { Builder, By, Key, until } = require("selenium-webdriver"); //Specific Classes from Selenium.
const fireFox = require("selenium-webdriver/firefox");  //Firefox specific classes. 

const fs = require("fs"); //File System Module. 
const path = require("path"); //Path Module.

/* ─────────────────────────────── custom mods ────────────────────────────── */
const { login, user } = require('./modules/user.js'); //Import the login function from user.js.


//* ──────────────────────────────── Constants ─────────────────────────────── */
const schoolStatus = path.basename('/Users/scle2/Desktop/Check Lists/schoolstats.txt') //Path to the School Status File.

//* ───────────────────────────── Status Reporter ──────────────────────────── */
async function statusReport(){
    let currentUser; 
    let driver = await new Builder().forBrowser("firefox").build(); //Create a new Firefox Browser Instance.
    await driver.get("https://my.charlotte.edu/"); //Navigate to My.UNCC.edu

//* ───────────────────── Check: Login Page or User page? ──────────────────── */
    const curURL  = await driver.getCurrentUrl(); //Get Current URL.
    switch (curURL) {
        case curURL.includes('https://webauth.uncc.edu/idp/profile/SAML2/Redirect') && driver.findElement(By.xpath('//*[@id="login-wrapper"]')) : // Login Page
            let user = await login();
            
            let loginField = await driver.getElement(By.xpath('//*[@id="username"]'));
            let passwordField = await driver.getElement(By.xpath('//*[@id="password"]'));
            let loginButton = await driver.getElement(By.xpath('//*[@id="shibboleth-login-button"]'));

            await loginField.sendKeys(currentUser.username);
            await passwordField.sendKeys(currentUser.password);
            await loginButton.click();
            return currentUser = user;
            break;


        case driver.findElement(By.className('error')):
            var errorType = await driver.findElement(By.xpath('//*[@id="page-wrapper"]/div/div/div[1]/h3')).getText();
            console.log("Error:"+ errorType +"/n Unable to login.");
            break;

        default:
            console.log("Error: Unable to login.");
            break;
    }


}