require('dotenv').config();

const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// PAGE VIEW API
router.get('/basic/:number', function(req, res) {
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
        const html = await page.content(); // Original code
        
        await page.waitFor('.property-item');
    
        // Load content in cheerio
        const $ = cheerio.load(html);
    
        // Create an empty array
        const landData = [];
    
        // Grab the data via it's class
        const data = $('.property-item');
        
        // Check the length
        console.log(data.length);
        // return console.log(data.attr());
              
        // Loop through grabbing data
        data.each( function() {
        
            const image = $(this).find('img').attr('data-src');
            const id = $(this).find('.result-card-item').attr('id');
            const town = $(this).find('').text().trim();
            const location = $(this).find('.property-location').text().trim();
            const type = $(this).find('.property-title').text().trim();
            const info = $(this).find('.property-address').text().trim();
            const price = $(this).find('.price').text().trim();
            const size = $(this).find('.h-area').text().trim();
            const agency    = $(this).find('.estate-agency-logo').find('img').attr('data-src');
            const contact = $(this).find('.listing-send-whatsapp').attr('onclick');
            const source = $(this).find('a').attr('href').trim();
        
            // Array object d
            landData.push({
                image: 'https://www.buyrentkenya.com'+image,
                id: id,
                town: location,
                type: type,
                location: location,
                info: info,
                price: price,
                size: size,
                agency: 'https://www.buyrentkenya.com'+agency,
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

// SEARCH API
router.get('/search/:term', (req, res) => {
    const term = req.params.term;
    //
    (async () => {
        const browser = await puppeteer.launch({headless: true});
    
        // Create a new page
        const page = await browser.newPage();
    
        // Using the newly created page, navigate to url
        await page.goto(`https://www.buyrentkenya.com/plots-land-for-sale/${term}`, {waitUntil: 'load'});

        // Get page content
        const html = await page.content(); // Original code
        
        await page.waitFor('.property-item');
    
        // Load content in cheerio
        const $ = cheerio.load(html);
    
        // Create an empty array
        const landData = [];
    
        // Grab the data via it's class
        const data = $('.property-item');
        
        // Check the length
        console.log(data.length);
        // return console.log(data.attr());
              
        // Loop through grabbing data
        data.each( function() {
        
            const image = $(this).find('img').attr('data-src');
            const id = $(this).find('.result-card-item').attr('id');
            const town = $(this).find('').text().trim();
            const location = $(this).find('.property-location').text().trim();
            const type = $(this).find('.property-title').text().trim();
            const info = $(this).find('.property-address').text().trim();
            const price = $(this).find('.price').text().trim();
            const size = $(this).find('.h-area').text().trim();
            const agency    = $(this).find('.estate-agency-logo').find('img').attr('data-src');
            const contact = $(this).find('.listing-send-whatsapp').attr('onclick');
            const source = $(this).find('a').attr('href').trim();
        
            // Array object d
            landData.push({
                image: 'https://www.buyrentkenya.com'+image,
                id: id,
                town: location,
                type: type,
                location: location,
                info: info,
                price: price,
                size: size,
                agency: 'https://www.buyrentkenya.com'+agency,
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


//*todo :term/:number
// HERE <--


// LAND DETAILS API
router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    //
    (async () => {
        const browser = await puppeteer.launch({headless: true});
    
        // Create a new page
        const page = await browser.newPage();
    
        // Using the newly created page, navigate to url
        await page.goto(`https://www.buyrentkenya.com/plots-land-for-sale/${id}`, {waitUntil: 'load'});

        // Get page content
        const html = await page.content(); // Original code
        
        await page.waitFor('.property-item');
    
        // Load content in cheerio
        const $ = cheerio.load(html);
    
        // Create an empty array
        const landData = [];
    
        // Grab the data via it's class
        const data = $('.property-item');
        
        // Check the length
        console.log(data.length);
        // return console.log(data.attr());
              
        // Loop through grabbing data
        data.each( function() {
        
            // const image = $(this).find('img').attr('data-src');
            const town      = $(this).find('').text().trim();
            const location  = $(this).find('.property-location').text().trim();
            const type      = $(this).find('.property-title').text().trim();
            const info      = $(this).find('.property-address').text().trim();
            const price     = $(this).find('.price').text().trim();
            const size      = $(this).find('.h-area').text().trim();
            const agency    = $(this).find('.estate-agency-logo').find('img').attr('src');
            const contact   = $(this).find('.listing-send-whatsapp').attr('onclick');
            const source    = $(this).find('a').attr('href').trim();
        
            // Array object d
            landData.push({
                // image: 'https://www.buyrentkenya.com'+image,
                town: location,
                type: type,
                location: location,
                info: info,
                price: price,
                size: size,
                agency: 'https://www.buyrentkenya.com'+agency,
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

module.exports = router;
