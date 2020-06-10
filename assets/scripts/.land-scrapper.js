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
        //
        const html = response.data; // assign the response to a variable
        //
        const $ = cheerio.load(html) // load cheerio
        //
        const landListings = $('.listing-card__content'); // scrapper selection
        const image = $('.listing-card__aside'); // scrap images
        //
        const landApiData = []; //set empty array
     

        landListings.each(function () {
            const image = $('.listing-card__aside').find('.listing-card__image > .listing-card__image__inner > img > src').text().trim();
            const title = $(this).find('.listing-card__header__title').text().trim();
            const price = $(this).find('.listing-card__info-bar > .listing-card__info-bar__price').text().trim();
            const contact = $(this).find('.listing-card__info-bar > .listing-card__info-bar__contact').text().trim();
            const listed = $(this).find('.listing-card__header__date').text().trim();

            landApiData.push({        
                name: title,
                image: image,
                cost: price,
                contact: contact,
                date: listed
            });
        });

        // console.log(landApiData);
        console.log(image);
    })
    .catch(console.error);