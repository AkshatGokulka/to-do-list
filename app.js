const express=require('express');
const bodyParser=require('body-parser');
 
const app=express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items=["hello","hi"];
var workitems=[];

app.get("/",function(req,res){
    var today=new Date();
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    var day=today.toLocaleDateString("en-US",options);
    res.render("list",{listTitle:day , newListItems:items});
});

app.post("/",function(req,res){
   // console.log(req.body);
   

    if(req.body.list=="Work")
    {
        var item=req.body.newItem;
        workitems.push(item);
        res.redirect("/work");
    }
    else{
        var item=req.body.newItem;
        items.push(item);
        res.redirect("/");
    }

    
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",  newListItems:workitems});
})



app.listen(3000,function(){
    console.log("The server is running on port 3000");
});