import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import * as userModel from '../models/userModel.js';   // ← Cambiado a "import * as"
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userModel.findByGoogleId(profile.id);
      
      if (user) {
        return done(null, user);
      }

      user = await userModel.findByEmail(profile.emails[0].value);
      
      if (user) {
        return done(null, user);
      }

      const newUser = await userModel.createUser({
        email: profile.emails[0].value,
        name: profile.displayName,
        googleId: profile.id,
        emailVerified: true
      });

      await userModel.createSubscription(newUser.id, 'basic');

      done(null, newUser);
    } catch (error) {
      console.error('Google auth error:', error);
      done(error, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;