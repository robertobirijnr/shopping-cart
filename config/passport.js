const passport = require("passport");
const User = require("../models/user");
const localStrategy = require("passport-local").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({ email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: "Email is already in use" });
        }

        let newUser = new User();
        // newUser.username = username;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  )
);

//Signin
passport.use(
  "local.signin",
  new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },function(req,email,password,done){
    User.findOne({ email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "No User found" });
        }
        if(!user.validPassword(password)){
            return done(null, false, { message: "Wrong password" }); 
        }
        return done(null,user);
      });
  })
);
