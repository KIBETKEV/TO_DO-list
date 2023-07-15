import express from 'express';
import bodyparser from 'body-parser';
// import date from (__dirname + "/date.js");


const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(express.static("public"))

let items = [];

app.get("/", function (req, res){
  

    let today = new Date();
       
    let options = {
     weekday: "long",
     day:"numeric",
     month: "long",
    };
    
    let day = today.toLocaleDateString("en-US", options);
    
    
    
    res.render("list", {kindOfDay: day, newItems: items});
});

app.post("/", function (req, res){

const item = req.body.newItem;

items.push(item);

res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is streaming on port 3000");
});