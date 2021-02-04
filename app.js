const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get("/", function(req, res) {
  res.send("Hello")
  res.render('index', {foo: 'FOO'});
  var today = new Data();
  var currentDay = today.getDay();


});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
