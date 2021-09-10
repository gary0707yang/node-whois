const scraper = require('seo-scraper');
const UserAgent = require('user-agents')

const options = {
  url: 'https://www.google.com/search?q=hello+google/',
  selectors: {
    textContent: {
      title:'title',
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6"
    },
      content: {
        description: "meta[name='description']",
        p:"p"
      }
  },
  config: {
    headers: {
      'User-Agent': new UserAgent().toString(),
    }
  }
}


scraper.scrape(options)
  .then(elements => console.log(elements))


