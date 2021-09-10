const scraper = require('seo-scraper');

scraper.scrape({ url: 'https://mornlift.com' })
  .then(elements => console.log(elements))