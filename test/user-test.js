// //fixme - no anda

// // var utils = require('../utils');
// // var config = require('../config');

// // require('../utils/dbconnect');

// require('../utils/dbconnect');

// var User = require('../models/users.js');

// // mongoose.connect('mongodb://localhost/crudtest');

// var u = new User({ email:"admin@admin.com", password: "123456" });
// u.save(function(err, doc){
//     console.log(err, doc);
// });

// console.log("PasswordOK", a.authenticate("123456"));
// console.log("PasswordFAIL", a.authenticate("incorrect"));

// // var assert = require('assert');

// Require basic config files and DB connection
require('../utils/dbconnect');

// Global Variables for the test case
var User, user;

// Unit Tests
describe('Model Test Users', function(){
    before(function(){
        // Before all tests
        Users = require("../models/users.js");
    });

    describe('Users', function(){
        // It show create a new document in the database
        it('add a users', function(done){
            user = new Users({
              email: 'users'+Math.floor((Math.random() * 10) + 1)+'@prueba.com',
              password: '123456'
            });
            user.save(done);
        });

        it('should authenticate', function (done) {
          user.authenticate('123456', done)
        })
//fFIXME - usar assert
        it('should not authenticate', function (done) {
          user.authenticate('incorrect', function(err, isMatch) {
            ass
          })
        })

    });
});
