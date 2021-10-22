const fetch = require("isomorphic-fetch");
const path = require("path");
const express = require("express");
const app = express();

//Routes
app.use(express.static(__dirname)); //https://stackoverflow.com/questions/19620239/cant-get-index-html-to-show-with-express-in-nodejs

app.post("/title-bot", async (req, res) => {
  const providedUrl = req.body; //=input.value from main.js
  const title = await fetch(providedUrl)
    .then(function (res) {
      const body = res.text();
      console.log(body);
      return body.split("<title>")[1].split("</title>")[0];
    })
    .catch((e) => {
      console.log(e); //catch errors
    });
  res.send(title);
});

// Listen for Requests
app.listen(4000, () => console.log("Server running on port 4000"));
