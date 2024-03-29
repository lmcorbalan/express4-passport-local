var mongoose = require( 'mongoose' )
  , Schema   = mongoose.Schema
  , bcrypt   = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
  email: String,
  password: String
});

userSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.method('authenticate', function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
});

var userModel = mongoose.model( "Users", userSchema );
module.exports    = userModel;
