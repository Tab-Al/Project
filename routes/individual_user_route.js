const route = require('express').Router();

route.get('/',function(req,res){
  res.render('user_view.ejs');
});
exports = module.exports = route;
