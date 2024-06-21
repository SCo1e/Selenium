/* -------------------------------------------------------------------------- */
/*                 Selenium Practice - News Scrapper w/ Notes                 */
/* -------------------------------------------------------------------------- */

//Goal: Script will navigate to BBC News, search 'Cyber Security' and return article titles that were updated/published within a week.

//* ---------------------------- Required Modules ---------------------------- */
const { Builder, By, Key, until } = require("selenium-webdriver"); //* Imports specified classes from selenium-webdriver module. (Faster than importing the whole module)

const fireFox = require("selenium-webdriver/firefox"); //*Imports chrome specific functionality

//* ---------------------------- Automation Function Start ---------------------------- */
async function secondtest() {
    let driver = await new Builder() // Creates a new webdriver instance
        .forBrowser("firefox") // specifying FIREFOX as the browser
        .build(); // Builds and configures the webdriver instance, will now be used to interact with firefox browser.

//Step: ---------------- Go to BBC news, then click on the search button. -------- */

    await driver.get("https://www.bbc.com/news"); // Navigates to the specified URL

    // Wait until the search button is visible on the webpage
    let searchButton = await driver.wait(
        until.elementLocated(
            By.xpath("/html/body/div[2]/div/header/div/div[1]/button[2]")
        )
    );
    await searchButton.click();

//Step: ----------------- Search for 'Cyber Security' in the search bar. --------- */

    //wait until the search bar is visible on the screen.
    let searchInput = await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath("/html/body/div[2]/div/div[3]/div/div[1]/div/input")))); 
    await searchInput.sendKeys("Cyber Security", Key.RETURN); // Enter 'Cyber Security' in the search bar and press 'Enter'

//Step: ---------------------------------- get result. -------------------------- */

    let searchResults = await driver.wait(
        until.elementLocated(
            By.xpath("/html/body/div[2]/div/main/div[1]/div/div[2]/div")
        ),
        10000
    );
    let articles = await searchResults.findElements(
        By.xpath('//div[@data-testid="liverpool-card"]')
    ); // Find all articles on the page

    console.log(`Found ${articles.length} articles.`); // Prints the number of articles found on the page

//Step: -------------------------- compare date of each article ----------------- */

    let today = new Date(); // Get the current date
    const desiredTargets = []; // Array to store the articles published within a week

    await Promise.all(articles.map(async (article) => { // Using promise to iterate each article and get the date of the article
        let articleDateText = await article.findElement(By.xpath('.//span[@data-testid="card-metadata-lastupdated"]')).getText();
        let articleTitle = await article.findElement(By.xpath('.//h2[@data-testid="card-headline"]')).getText();
        console.log(articleDateText); // Get the date of the article

        let articleDate;

        //* ------------ Check if the date contains "min", "hr", or "day" ------------ */
        if (articleDateText.includes('min')) {
            let minutes = parseInt(articleDateText.split(' ')[0]); // Get the number of minutes
            articleDate = new Date(today.getTime() - minutes * 60000); // Subtract the minutes from the current date to get the article date
        } 
        
        else if (articleDateText.includes('hr')) {
            let hours = parseInt(articleDateText.split(' ')[0]); // Get the number of hours
            articleDate = new Date(today.getTime() - hours * 3600000); // Subtract the hours from the current date to get the article date
        } 
        
        else if (articleDateText.includes('day')) {
            let days = parseInt(articleDateText.split(' ')[0]); // Get the number of days
            articleDate = new Date(today.getTime() - days * 86400000); // Subtract the days from the current date to get the article date
        } 
        
        else {
            articleDate = new Date(articleDateText); // Convert the date string to a date object
        }

//Step: ------------------------ push articles published in a week --------------- */

        if ((today - articleDate) < 604800000) {
            desiredTargets.push(articleTitle);
        }
    }));

    console.log(`Found ${desiredTargets.length} articles published within a week.`); // Print the number of articles published within a week
    console.log('Desired Targets: ', desiredTargets); // Print the desired targets
}

secondtest();
