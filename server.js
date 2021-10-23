const fetch = require("isomorphic-fetch");
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Middleware
//const bodyParser = require("body-parser"); //allows req.body.. depricated?
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

//Routes
app.use(express.static(__dirname)); //https://stackoverflow.com/questions/19620239/cant-get-index-html-to-show-with-express-in-nodejs
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.post("/title-bot", async (req, res) => {
  const providedUrl = req.body.URL; //=input.value from main.js
  console.log(providedUrl);

  const response = await got(providedUrl);

  const dom = new JSDOM(response.body); //https://www.twilio.com/blog/web-scraping-and-parsing-html-in-node-js-with-jsdom
  const allTitles = [...dom.window.document.querySelectorAll("title")];

  let data = null;
  allTitles.forEach((title) => {
    //looping through title data
    if (!data && title.text) {
      data = title.text;
    }
  });
  console.log(data);

  res.json(data);

  // const title = await fetch(providedUrl)
  //   .then(function (res) {
  //     const body = res.text();
  //     console.log(body);
  //     return body.split("<title>")[1].split("</title>")[0];
  //   })
  //   .catch((e) => {
  //     console.log(e); //catch errors
  //   });
});

// Listen for Requests
app.listen(4000, () => console.log("Server running on port 4000"));
