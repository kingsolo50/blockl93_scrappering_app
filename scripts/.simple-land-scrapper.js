const express = require('express');
const router = express.Router();
const fs = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio'); // Basically jQuery for node.js
const images = 'div > table > tbody > tr > td > a > img';
const request = require('request');
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const axios = require('axios');
const url = 'https://www.pigiame.co.ke/land-for-sale';

axios(url)
    .then(response => {
        // ASSIGNING RESPONSE TO A VARIABLE
        const html = response.data; 
        
        // LOAD CHEERIO
        const $ = cheerio.load(html);
        
        // SCRAPPER ELEMENT DOM SELECTION
        const landListings = $('.listing-card'); 
        //* console.log(landListings.length); 
        
        // const landListingImage = $('.listing-card__aside .listing-card__image__inner > img');
        //* console.log(landListingImage.length);
        
        //-> INIT EMPTY ARRAY
        const landApiData = []; 
     

        landListings.each(function () {            
            const image = $(this).find('.listing-cards .listings-cards__list listings-cards__list-item .listing-card__aside .listing-card__image__inner > img').text().trim();            
            const type = $(this).find('.listing-card__header__title').text().replace(/\n/g, ' ');
            const location = $(this).find('.listing-card__header__tags__item').text().replace(/\n/g, ' ');
            const price = $(this).find('.listing-card__info-bar > .listing-card__info-bar__price').text().trim();
            const contact = $(this).find('.listing-card__info-bar > .listing-card__info-bar__contact').text().trim();
            const listed = $(this).find('.listing-card__header__date').text().trim();

            landApiData.push({        
                type: type,
                location: location,
                image: image,
                cost: price,
                contact: contact,
                date: listed
            });
        });

        console.log('API Data ',landApiData);
        
    })
    .catch(console.error);