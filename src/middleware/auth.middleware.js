const { JWT_SECRET } = require("../configs/server");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

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

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      const validatePassword = await bcrypt.compare(
        password,
        user.passwordHash
      );
      if (!validatePassword) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user, { message: "Login successful" });
    } catch (error) {
      return done(error);
    }
  }
);

passport.use("jwt", jwtStrategy);
passport.use("local", localStrategy);

const authMiddleware = passport.authenticate("jwt", { session: false });
const localAuthMiddleware = passport.authenticate("local", { session: false });

module.exports = { authMiddleware, localAuthMiddleware };
