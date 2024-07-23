const { JWT_SECRET } = require("../configs/server");
const passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  function (jwt_payload, done) {
    console.log("payload received", jwt_payload);
    User.findOne({ id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }
);

passport.use("jwt", jwtStrategy);

const authMiddleware = passport.authenticate("jwt", { session: false });

module.exports = authMiddleware;
