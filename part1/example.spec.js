const { test, expect } = require("@playwright/test");
const data = require("./data.json");
const fs = require("fs");
const path = require("path");
const { log } = require("console");
const logFilePath = path.join(__dirname, "test-logs.txt");

//Here the steps for open the E-commerce website and search Titan Watch

//Steps for logg the message
function logToFile(message) {
  fs.appendFileSync(logFilePath, `${message}\n`);
}

//Steps for logging before starting each test
test.beforeEach(async ({ page }, testInfo) => {
  logToFile(`Starting test ${testInfo.title}`);
});
//Steps for logging after the test completed
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === "failed") {
    logToFile(`Test failed: ${testInfo.title}`);

    const screenshotPath = path.join(
      __dirname,
      "screenshots",
      `${testInfo.title}.png`
    );
    await page.screenshot({ path: screenshotPath });
    logToFile(`Screenshot saved at ${screenshotPath}`);
  }
});


//Test started here
test("Excercise 1- Open up the amazon website", async ({ page }) => {
  //Navigate to given url
  logToFile("Navigating to amazon.com");

  try {
    await page.goto(data.appurl);
    await page.getByPlaceholder("Search Amazon.in").fill(data.searchTerm);
    await page.getByPlaceholder("Search Amazon.in").press("Enter");

//Log the first product
   const name= await page.locator('.puis-card-container > div > div:nth-child(2)').first().textContent();
   logToFile('Product Information '+name);
   
   

    const newPageTitle = await page.title();
    logToFile(`New page title: ${newPageTitle}`);
  } catch (error) {

    logToFile(error);
  }
//Opening the new tab for product page
  try {
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Sponsored Ad - Titan Smart 3" })
      .click();

     
      
    const page1 = await page1Promise;
    //Cliking the add to shopping cart page


    await page1.getByTitle("Add to Shopping Cart").click();
    await page1.getByLabel("Proceed to Buy (1 item) Buy").click();
  } catch (error) {
    logToFile(error);
  }
});
