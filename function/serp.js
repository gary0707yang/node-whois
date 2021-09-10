const serp = require("serp");

var options = {
//   host : "google.fr",
  qs : {
    q : "google new",
    filter : 0,
    pws : 0
  },
  num : 100
};

let links = {};

async function app(){
    links = await serp.search(options);
    console.log(links)
}

app()
.catch(err => {
    console.log(err)
})

