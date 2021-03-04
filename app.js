const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const date = require(__dirname + "/date.js")

const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

const itemsSchema = new mongoose.Schema({
    name: String,
});

const newPerson = mongoose.model("Item", itemsSchema);



app.get("/", function(req, res) {
  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  console.log(req.body);
  if (req.body.list == "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
})
app.get("/index", function(req, res) {
  res.render("index");
})



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
