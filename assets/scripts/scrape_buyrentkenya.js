require('dotenv').config();

/**
 * Require the puppeteer library.
 */
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://www.buyrentkenya.com/plots-land-for-sale';

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
  const data = $('.property-item');
  
  // Check the length
  console.log(data.length);
  // return console.log(data.attr());

  const numbers = /^[0-9]+$/;
  
  // Loop through grabbing data
  data.each( function() {

    const image = $(this).find('img').attr('data-src');
    const town = $(this).find('').text().trim();
    const location = $(this).find('.property-location').text().trim();
    const type = $(this).find('.property-title').text().trim();
    const info = $(this).find('.property-address').text().trim();
    const price = $(this).find('.price').text().trim();
    const size = $(this).find('.h-area').text().trim();
    const contact = $(this).find('.listing-send-whatsapp').attr('onclick');
    const source = $(this).find('a').attr('href').trim();

    // Array object d
    landData.push({
        image: 'www.buyrentkenya.com'+image,
        town: location,
        type: type,
        location: location,
        info: info,
        price: price,
        size: size,
        contact: contact,
        source: 'www.buyrentkenya.com'+source
    });

    // fs.writeFileSync("./assets/pigiame.json", JSON.stringify(landData), function(err) { if(err) { return console.log(err) }}); 
    
});

// console.log('Saved data ',landData);

// Wait 3 seconds and then close the browser instance.
setTimeout(() => {
    browser.close();
  }, 3000);
}

/**
 * Start the script by calling main().
 */
main();

