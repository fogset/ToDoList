const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
var items = ["Buy Food","Cook Food","Eat Food"];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');




app.get("/", function(req, res) {

  var today = new Date();
  var currentDay = today.getDay();
  var day ="Sunday";

  var options = {
    weekday: "long",
    day:"numeric",
    month:"long"
  }
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay:day,
    newListItems:items
  });

});

app.post("/", function(req, res){
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
})


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
