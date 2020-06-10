require('dotenv').config();

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://www.knightfrank.com/property-for-sale/kenya';

/**
 * Inside the main function we'll place all the required code
 * that will be used in the scraping process.
 * The reason why we create an async function is to use
 * the power of async programming  that comes with puppeteer.
 */
async function main() {
  
  const browser = await puppeteer.launch({
    headless: true
  });

  // Create a new page
  const page = await browser.newPage();

  // Using the newly created page, navigate to url
  await page.goto(url, {waitUntil: 'load'});

  // Get page content
  const html = await page.content();

  // Load content in cheerio
  const $ = cheerio.load(html);

  // Create an empty array
  const landData = [];

  // Grab the data via it's class
  const data = $('.property-list');
  
  // Check the length
  console.log(data.length);
  // return console.log(data.attr());

  // Loop through grabbing data
  data.each( function() {
      
    const imageUrl = $(this).find('.image > img').attr('src');
    const town = $(this).find('h2').text().trim();
    const location = $(this).find('.property').text().trim().replace(/\n\n/, ' ');
    const price = $(this).find('.price').text().trim().replace(/Asking\sPrice|Price\sReduced\sto/,'');
    // const contact = $(this).find('.listing-card__info-bar > .listing-card__info-bar__contact').text().trim();
    // const listed = $(this).find('.listing-card__header__date').text().trim();

    // Array object d
    landData.push({
        imageUrl: imageUrl,
        town: town,
        location: location,
        price: price,
        // contact: contact,
        // dateListed: listed
    });


    // Save data 
    // Push data to atlas

    // fs.writeFileSync("./assets/pigiame.json", JSON.stringify(landData), function(err) { if(err) { return console.log(err) }}); 
    
});

console.log('Saved data ',landData);

// Wait 3 seconds and then close the browser instance.
setTimeout(() => {
    browser.close();
  }, 3000);
}

/**
 * Start the script by calling main().
 */
main();

