module.exports = function(app, urlencoder){

const passport = require('../passport/passport');
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'estore'
  });
connection.connect();

var lData;
connection.query("SELECT * from laptops ORDER BY discount desc;", function(err,result,fields){
    lData=result;
});
var mData;
connection.query("SELECT * from mobiles ORDER BY discount desc;", function(err,result,fields){
    mData=result;
});
var tData;
connection.query("SELECT * from tvs ORDER BY discount desc;", function(err,result,fields){
    tData=result;
});
var hData;
connection.query("SELECT * from hps ORDER BY discount desc;", function(err,result,fields){
    hData=result;
});

app.get('/', function(req,res){
  console.log('User Viewing Main Page');
  res.render('welcomepage', {ldata: lData, mdata: mData, tdata: tData, hdata: hData});
});

app.get('/contactus',function(req,res){
  console.log('User at Contact Us page');
  res.render('contactus');
});

/*app.post('/signup', urlencoder, function(req,res){
  var check_sql = "SELECT count(id) as exist from users WHERE id= ?";

  connection.query(check_sql,[req.body.username],function(err,result,fields){
    console.log("Checking for username : ",req.body.username);
    if(result[0].exist == 0)
    {
      console.log("Signup Tried : Adding to DB");
      var add_sql = "INSERT INTO users VALUES (? , ? , 0 , ? , ? , 0 , ?)";
      connection.query(add_sql,[req.body.username,req.body.password, req.body.email, req.body.bday, req.body.phone], function(err,result,fields){
        console.log("User added succesfully");
      });
      res.redirect('/');
    }
    else {
      console.log("Signup Tried : Failed as user already exists");
      res.render('signup_fail', {name: req.body.username});
      //res.redirect('/');
    }
  });
  //res.render('signup-success', userdata: req.body);
});*/


app.get('/signup', urlencoder, function(req,res){

  var check_sql = "SELECT count(id) as exist from users WHERE id= ?";

  connection.query(check_sql,[req.query.username],function(err,result,fields){
    console.log("Checking for username : ",req.query.username);
    if(result[0].exist == 0)
    {
      console.log("Signup Tried : Adding to DB");
      var add_sql = "INSERT INTO users VALUES (? , ? , 0 , ? , ? , 0 , ?)";
      connection.query(add_sql,[req.query.username,req.query.password, req.query.email, req.query.bday, req.query.phone], function(err,result,fields){
        console.log("User added succesfully");
      });
      res.redirect('/');
    }
    else {
      console.log("Signup Tried : Failed as user already exists");
      res.render('signup_fail', {name: req.query.username});
      //res.redirect('/');
    }
  });
  //res.render('signup-success', userdata: req.body);
});

app.get('/checkout',function(req,res){
  res.render('checkout');
});


};
