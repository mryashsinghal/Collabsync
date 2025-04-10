import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Profile from "../models/Profile.js";

const passportConnection = async () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (!user) {
            user = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              isVerified: true, // Google emails are verified
              authType: "google",
              googleId: profile.id,
            });

            await user.save();

            let userProfile = await Profile.findOne({ userId: user._id });
            if (!userProfile) {
              userProfile = await Profile.create({
                userId: user._id,
                user: user.username,
                email: user.email,
              });
            } 
          }

          if (user.authType === "email") {
            return done(null, false, { message: "This email is registered with email/password. Please log in using email and password." });
          }

          // Generate JWT token
          if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
          }
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          return done(null, { user, token });
        } catch (error) {
          //console.error("Error in GoogleStrategy:", error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.user._id); // Serialize only the user ID
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      //console.error("Error in deserializeUser:", error);
      done(error, null);
    }
  });
};

export default passportConnection;