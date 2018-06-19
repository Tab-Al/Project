var passport = require('passport');
const strategy = require('./strategies');


var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'estore'
});
connection.connect();

passport.use(strategy.ls);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  var sql = "SELECT * from users WHERE id = ? ";
  connection.query(sql, [id], function(err, result){
    done(err, result[0]);
  });
});

exports = module.exports = passport;
