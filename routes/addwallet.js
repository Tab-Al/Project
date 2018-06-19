const route = require('express').Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'estore'
});
connection.connect();

route.post('/',function(req,res){
  var sql = "UPDATE users SET wallet=? WHERE id=?";
  connection.query(sql,[req.body.money,req.user.id],function(err,result){
    console.log("money added");
    res.redirect('/');
  });
})
exports = module.exports = route;
