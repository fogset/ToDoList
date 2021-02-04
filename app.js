const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get("/", function(req, res) {
  //res.send("Hello")

  var today = new Data();
  var currentDay = today.getDay();
  var day ="";

  if(currentDay === 6 || currentDay ===0){
    day = "Weekend";
  }else{
    day = "Weekday";
  }
  res.render("list", {kindOfDay: day});

});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
