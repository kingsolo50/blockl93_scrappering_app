require('dotenv').config();

/**
 * Require the puppeteer library.
 */
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://www.buyrentkenya.com/plots-land-for-sale';
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

