var app      = module.parent.exports.app
  , passport = module.parent.exports.passport
  , Users    = require('../models/users.js');


app.get('/login', function (req, res) {
  res.render('login', { title: 'Login', no_menu: true })
});

app.post('/login', passport.authenticate('UserLogin',
  { successRedirect: '/list'
  , failureRedirect: '/login'
  , failureFlash: true
  , successFlash: 'Welcome!'
  }
));

app.get('/logout', function (req, res) {
  req.logout();
  req.flash( "info", "Chau!" );
  res.redirect('/')
});
