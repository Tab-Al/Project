const LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'estore'
});
connection.connect();

const ls = new LocalStrategy(function(username, password, done){
  var sql = "SELECT * from users WHERE id = ? ";
  connection.query(sql,[username],function(err,result, fields){
    if(err)
    {
      console.log("ERROR");
      return done(err); }
    if(!result.length)
    { console.log("No Such Username");
      return done(null,false, {message: 'No such username exists'}); }

    if(result[0].pass == password)
    {
      console.log(username + " LOGGED IN");
      return done(null, result[0]);

    }
    else
    { console.log("Wrong Password");
      return done(null,false, {message: 'Wrong Password'}); }
  });
});

exports = module.exports = {ls}
