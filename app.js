import express from 'express';
import bodyparser from 'body-parser';
// import date from (__dirname + "/date.js");
import mongoose from 'mongoose';

const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(express.static("public"))
mongoose.connect("mongodb://localhost:27017/toDoListDB", {useNewUrlParser: "true"});
const itemsSchema = {
    name: "string"
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Let's make this day count!"
});

const item2 = new Item({
    name: "Aye we are almost there, make it count!"
});



// const defaultItems = [item1, item2];

// const listSchema = {
//     name:"string"
//     items: [itemsSchema]
// };

app.get("/", function (req, res){
  
    
    let today = new Date();
       
    let options = {
     weekday: "long",
     day:"numeric",
     month: "long",
    };
    
    let day = today.toLocaleDateString("en-US", options);
    
    
        Item.find({}, function(err, foundItems){
            if (foundItems.lenght === 0) {
                Item.insertMany(defaultItems, function(err){
                    if (err) {
                        console.log("Error!");
                    }else{
                        console.log("Successfully saved to DB!");
                    }
                });
                res.redirect("/");
            }else{
            res.render("list", {kindOfDay: day, newItems: foundItems});
        }
    });
});
app.post("/", function (req, res){

const itemName =  req.body.newItem;
 const item = new Item({
    name: itemName
 });
 item.save();
 res.redirect("/");
});

// app.get("/:customListName", function (req, res){
//     const customListName = req.params.customListName;
//    List.findOne({name: customListName}, function (err, founndList){
//     if(!err){
//     }else{}
//     }
//    })

//     const list = new List ({
//         name: customListName,
//         items: defaultItems
//     }) 
//     list.save();
// })

app.post ("/delete", function (req,res){
    const checkedItemId = req.body.checkbox;

    Item.findByAndRemove (checkedItemId, function (err){
        if (!err){
            console.log("successfully deleted");
            res.redirect("/")
        }
    });
});


app.listen(3000, function(){
    console.log("Server is streaming on port 3000");
});