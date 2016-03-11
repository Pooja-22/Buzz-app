var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserService = require('../../api/user/user.service');
var config = require('../../config/environment');

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    /**
     *
     * @param accessToken
     * @param refreshToken
     * @param profile
     * @param done
     * @returns {*}
     */

    function (accessToken, refreshToken, profile, done) {
      if (profile._json.domain === "tothenew.com") {
        var google_id = profile.id;
        var userObj = {
          name: profile.displayName,
          email: profile.emails[0].value,
          role: config.adminUserIds.indexOf(profile.emails[0].value) != -1 ? 'admin' : 'user',
          provider: 'google',
          google: profile._json
        };
        UserService.createAndUpdate(google_id, userObj, function (err, user) {
            {
              if (err) return done(err);
              done(err, user);
            }
          }
        );
      }
      else {
        return done(null, {
          'error_code': '1010',
          'message': 'Invalid Domain Name'
        });
      }
    }
  ));
};
