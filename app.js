var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('./passport/passport');
var controller1 = require( './controllers/main_page');
var controller2 = require( './controllers/each_product_page');
var controller3 = require( './controllers/adminpanel');
var validator = require('express-validator');

var app = express();
var urlencoded = bodyParser.urlencoded({extended : true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());

var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'estore'
});
connection.connect();
var sessionStore = new MySQLStore({}, connection);

//set up template engine
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {maxAge: 3000000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get('*',function(req,res,next){
  res.locals.user = req.user || null;
  res.locals.session = req.session || null;
  next();
});

//fire controller1
controller1(app, urlencoded);
controller2(app, urlencoded);
controller3(app, urlencoded);



//static files
app.use(express.static('./assets'));

app.get('/logout',function(req,res){
  req.user = null;
  req.session.cart = null;
  req.logout();
  req.flash('success','You are logged out');
  console.log('User Logged Out');
  res.redirect('/');
});

/*ssapp.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});*/
app.use('/addwallet', require('./routes/addwallet'));
app.use('/users', require('./routes/individual_user_route'));
app.use('/addtocart', require('./routes/addtocart_route'));
app.use('/login', require('./routes/login_route'));
app.use('/cart',require('./routes/cart_route'));
app.use('/checkout',require('./routes/checkout_route'));
//listen
app.listen(3000);
console.log('Server at Port : 3000 started');
