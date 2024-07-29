const { JWT_SECRET } = require("../configs/server");
const passport = require("passport");
const User = require("../models/user.model");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id).select("-passwordHash");
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }
);

passport.use("jwt", jwtStrategy);

const authMiddleware = passport.authenticate("jwt", { session: false });

module.exports = authMiddleware;
