module.exports = function(app, urlencoded){
  
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'estore'
  });
  connection.connect();


app.get('/adminpanel', function(req,res){
    res.render("admin");
});


app.post("/laptop",function(req,res){
    var image=req.body.image;
    var model_no=req.body.model_no;
    var price=req.body.price;
    var RAM=req.body.RAM;
    var Graphics_card=req.body.Graphics_card;
    var display_size=req.body.display_size;
    var newlaptop={image: image,model_no:model_no,price: price,RAM : RAM,Graphics_card:Graphics_card,display_size:display_size};
    connection.query('INSERT INTO laptops SET ?', [newlaptop], function (err, result) {
    if (err) {
        console.log(err);
    }
    else{
        res.redirect("/laptop");
        console.log(newlaptop);
    }
  });
});


app.get("/adminpanell",function(req,res){
    res.render("newl");
});

app.post("/tv",function(req,res){
    var image=req.body.image;
    var model_no=req.body.model_no;
    var price=req.body.price;
    var brand=req.body.brand;
    var type=req.body.type;
    var display_size=req.body.display_size;
    var newtv={image: image,model_no:model_no,price: price,brand : brand,type:type,display_size:display_size};
    con.query('INSERT INTO tv SET ?', newtv, function (err, result) {
    if (err) {
        console.log(err);
    }
    else{
       // res.redirect("/tv");
       console.log(newtv);
    }
   })
});

app.get("/adminpanelt",function(req,res){
    res.render("newt");
});


app.post("/mobile",function(req,res){
    var image=req.body.image;
    var model_no=req.body.model_no;
    var price=req.body.price;
    var RAM=req.body.RAM;
    var color=req.body.color;
    var space=req.body.space;
    var brand=req.body.brand;
    var newmobile={image: image,model_no:model_no,price: price,RAM : RAM,brand: brand,space: space,color: color};
    con.query('INSERT INTO mobile SET ?', newmobile, function (err, result) {
    if (err) {
        console.log(err);
    }
    else{
     //   res.redirect("/mobile");
     console.log(newmobile);
    }
   })
});


app.get("/adminpanelm",function(req,res){
    res.render("newm");
});


app.post("/earphone",function(req,res){
    var image=req.body.image;
    var model_no=req.body.model_no;
    var price=req.body.price;
    var brand=req.body.brand;
    var category=req.body.category;
    var sound_qualit=req.body.sound_qualit;
    var newearphone={image: image,model_no:model_no,price: price,brand : brand,category:category,sound_qualit:sound_qualit};
    con.query('INSERT INTO earphone SET ?', newearphone, function (err, result) {
    if (err) {
        console.log(err);
    }
    else{
    //    res.redirect("/earphone");
    console.log(newearphone);
    }
   })
});


app.get("/adminpanele",function(req,res){
    res.render("newe");
});
};
