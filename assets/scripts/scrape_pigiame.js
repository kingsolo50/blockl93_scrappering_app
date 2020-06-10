require('dotenv').config();

/**
 * Require the puppeteer library.
 */
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://www.pigiame.co.ke/land-for-sale';

// function wait (ms) {
//     return new Promise(resolve => setTimeout(() => resolve(), ms));
// }
 
async function main() {
  
  const browser = await puppeteer.launch({
    headless: true
  });

  // Create a new page
  const page = await browser.newPage();

  // Using the newly created page, navigate to url
  await page.goto(url, {waitUntil: 'load'});

  // // Some extra delay to let images load
  // await wait(200);

  // Get page content
  const html = await page.content();

  // Load content in cheerio
  const $ = cheerio.load(html);

  // Create an empty array
  const landData = [];

  // Grab the data via it's class
  const data = $('.listing-card');
  
  // Check the length
  console.log(data.length);
  // return console.log(data.attr());

  // Loop through grabbing data
  data.each( function() {

    
    // const image = 'https://via.placeholder.com/350'; 
    const image = $(this).find('img').attr('data-src');
    const town = $(this).find('.listing-card__header__title').text().trim();
    const location = $(this).find('.listing-card__header__tags__item').text().trim().replace(/\n\n/, ' ');
    const price = $(this).find('.listing-card__info-bar > .listing-card__info-bar__price').text().trim();
    const contact = $(this).find('.listing-card__info-bar > .listing-card__info-bar__contact').text().trim();
    const listed = $(this).find('.listing-card__header__date').text().trim();

    // Array object d
    landData.push({
        image: image,
        town: town,
        location: location,
        price: price,
        contact: contact,
        dateListed: listed
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

