const route = require('express').Router();
var Cart = require('../controllers/cart.js');

route.get('/',function(req,res){
  console.log("User Viewing Cart");
  if(req.session.user)
  {
    res.render('cart',{products: null});
  }
  var cart = new Cart(req.session.cart);

  res.render('cart_view', {products: cart.generatearray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty});

});

exports = module.exports = route;
