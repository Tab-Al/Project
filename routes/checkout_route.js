const route = require('express').Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'estore'
});

route.post('/:method',function(req,res){

  var cardname = req.body.cardname;
  var cardno = req.body.cardno;
  var cvv = req.body.cvv;
  var username = req.body.username;
  var street = req.body.street;
  var area = req.body.area;
  var landmark = req.body.landmark;
  var city = req.body.city;
  var pincode = req.body.pincode;

  var sql = "INSERT INTO orders VALUES(?,?,?,?,?,?,?,?,?,?,?)";

  if(req.params.method == '1')
  {
    console.log("Checkout using Wallet");
    req.user.wallet = req.user.wallet - req.session.cart.totalPrice;
    req.user.itemsbought = req.user.itemsbought + 1;
    connection.query("UPDATE users SET wallet=?,itemsbought=? WHERE id=?",[req.user.wallet,req.user.itemsbought,req.user.id],function(err,result){
      console.log("New Wallet Balance" + req.user.wallet);
    });
    connection.query(sql,[req.user.id,"Wallet",0,0,0,username,street,area,landmark,city,pincode],function(err,result){
      req.session.cart = null;
      console.log("Order Confirmed");
      res.render("order_done");
    });
  }
  if(req.params.method == '2')
  {
    req.user.itemsbought = req.user.itemsbought + 1;
    connection.query("UPDATE users SET itemsbought=? WHERE id=?",[req.user.itemsbought,req.user.id],function(err,result){
    });
    connection.query(sql,[req.user.id,"COD",0,0,0,username,street,area,landmark,city,pincode],function(err,result){
      req.session.cart = null;
      console.log("Order Confirmed");
      res.render("order_done");
    });
  }
  if(req.params.method == '3')
  {
    req.user.itemsbought = req.user.itemsbought + 1;
    connection.query("UPDATE users SET itemsbought=? WHERE id=?",[req.user.itemsbought,req.user.id],function(err,result){
    });

    connection.query(sql,[req.user.id,"Card",cardname,cardno,cvv,username,street,area,landmark,city,pincode],function(err,result){
      req.session.cart = null;
      console.log("Order Confirmed");
      res.render("order_done");
    });
  }
});
exports = module.exports = route;
