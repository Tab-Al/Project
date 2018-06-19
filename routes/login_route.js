const route = require('express').Router();
const passport = require('../passport/passport');
var dialog = require('dialog');

route.get('/failure',(req,res) => {

  dialog.info('Wrong Username/Password. ' + '\n' + '\n' + 'Try Again', 'Error', function(exitCode) {
  res.redirect('/');
  });

});

route.post('/', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login/failure', failureFlash: true})
);
exports = module.exports = route;
