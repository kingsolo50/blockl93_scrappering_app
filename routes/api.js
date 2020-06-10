require('dotenv').config();

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Api = require('../model/api');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
// const url = `https://www.buyrentkenya.com/plots-land-for-sale?page=${number}`;

// function wait (ms) {
//     return new Promise(resolve => setTimeout(() => resolve(), ms));
// }
// wait(500); 

//* Land, plots for-sale
/** 
 * number is a parameter which will be sent from the front-end 
 * other parameters can be implemented to filter the response 
*/
router.get('/buy-rent-kenya/plots-land-for-sale/:number', function(req, res) {
    // Assign page number
    const number = req.params.number;
    
    //
    (async () => {
        const browser = await puppeteer.launch({headless: true});
    
        // Create a new page
        const page = await browser.newPage();
    
        // Using the newly created page, navigate to url
        await page.goto(`https://www.buyrentkenya.com/plots-land-for-sale?page=${number}`, {waitUntil: 'load'});
    
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
            // fs.writeFileSync("./assets/pigiame.json", JSON.stringify(landData), function(err) { if(err) { return console.log(err) }}); 
            
        });
        
        // console.log('Saved data ',landData);

        // Response with data
        res.status(200).json({
            success: true,           
            data: landData
        });     
        
        await browser.close();
    })();

});

//*todo Flats & apartments for-sale
router.get('/buy-rent-kenya/flats-apartments-for-sale/:number', (req, res) => {});

//*todo Houses for sale
router.get('/buy-rent-kenya/houses-for-sale/:number', (req, res) => {});

//*todo Commercial land for sale
router.get('/buy-rent-kenya/commercial-property-for-sale/:number', (req, res) => {});

/* Post API data to db. */
router.post('/', function(req, res, next) {
    
    
    const knightFrank = require('../assets/scripts/scrape_knightfrank');
    const pigiaMe = require('../assets/scripts/scrape_pigiame');
    const buyKenya = require('../assets/scripts/scrape_buyrentkenya');
    
    res.send(buyKenya);
    
});

module.exports = router;
