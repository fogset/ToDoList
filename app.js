const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const date = require(__dirname + "/date.js")

const app = express();
//const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
});

const itemsSchema = {
  name: String,
};
const workItemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your to do list",
});
const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];
const listSchema ={
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("List", listSchema);

const workItem= mongoose.model("workItem", workItemsSchema);
const workItem1 = new workItem({
  name: "working",
});
const defaultworkItems = [item1, item2, item3];


app.get("/", function(req, res) {
  let day = date.getDate();
  Item.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: day,
        newListItems: foundItems
      });
    }
  })
})

app.post("/", function(req, res) {

    let itemName = req.body.newItem;
    const item = new Item({
      name: itemName,
    });
    item.save();
    res.redirect("/");
})

app.post("/delete", function(req,res){
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted checked item.")
      res.redirect("/");
    }
  });
})

app.get("/:customListName", function(req,res){
  const customListName = req.params.customListName;

  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if(!foundList){
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName)
      }else{
        //Show an exiting list
        res.render("list",{listTitle:foundList.name, newListItems: foundList.items})
      }
    }
  })

})


app.get("/index", function(req, res) {
  res.render("index");
})



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
