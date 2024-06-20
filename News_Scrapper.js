//* ------------------------------ Requirements ------------------------------ */
//Selenium is a browswer automation library. 
//!Import selenium webdriver library (installed via npm)

//! More efficient method of using selenium is selecting specific classes. 
const {Builder, By, Key, until} = require('selenium-webdriver');
    //*Builder: Configure and create new WebDriver Instances. Also allows for specifying optiosn to match the browser used.
    //*By: Methods to locate elements on webpage. so 'By.id(), by.name(), etc
    //*Key: Keyboard keys, so it class specific key funcitonality.
const chrome = require('selenium-webdriver/chrome'); //!Imports chrome specific functionality

async function secondtest(){ //! Async funciton 'secondtest' will be used to execute automation funciton

let driver = await new Builder() //! Builder is a class that lets you set all options in one command, so it contains general options as well. using  drops all irrelevant options to selected browser. Utilizing await for asynchronous operations//
    .forBrowser('chrome') //! specifying CHROME as the browser
    .build(); //! Builds and configures the webdriver instance, will now be used to interact with chrome browser.

//? Go to bbc news pull a webpage and return the text found.
    //! Navigate to bbc news.
     await driver.get('https://www.bbc.com/news');

     //! Find elements to interact with. 
        //* driver will wait until the menu button is revealed on the webpage and then will add it the variable menuButton. 
        let menuButton = await driver.findElement(By.xpath('/html/body/div/div/header/div/div[1]/button[1]/svg/path'));      
       //* click on the menu button
       await driver.wait(until.elementIsVisible(menu)).menuButton.click();

       //* Click on the news button
       let newsButton = await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[4]/div/button'));
       await driver.wait(until.elementis(newsButton)).newsButton.click();

       //*click on the asia button

       let asiaButton = await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[4]/div/div/div[8]/div/a/button'));
       await driver.wait(until.elementIsVisible(asiaButton)).asiaButton.click();





};

secondtest();