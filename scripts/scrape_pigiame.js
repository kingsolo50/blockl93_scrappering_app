require('dotenv').config();

/**
 * Require the puppeteer library.
 */
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://www.pigiame.co.ke/land-for-sale';
const Listing = require('../model/blockl93');
const mongoose = require('mongoose');


// =====================================================================
// DATABASE CONNECTION
// =====================================================================
const   mongoOptions = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        // reconnectInterval: 100, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
};
                
mongoose.connect(process.env.MONGODB, mongoOptions);
 
const   db = mongoose.connection;
         
        db.on('error', console.error.bind(console, 'Connection error'));
        db.once('open', function () { console.log('Connected to database')});
  

function wait (ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}
 
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

  // Some extra delay to let images load
  await wait(200);

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

