const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('./db.js');

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (username, password, done) {
    knex('user')
      .where('email', '=', username)
      .then((err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.isValid(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  knex.from('user').where('id', '=', id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
});

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

module.exports = passport;