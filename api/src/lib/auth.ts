import argon from "argon2";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../prisma";
import {
  BE_ORIGIN,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../utils/env";

const validatePassword = async (password: string, hash: string) => {
  return await argon.verify(hash, password);
};

const generatePasswordHash = async (password: string) => {
  const hash = await argon.hash(password);

  return hash;
};

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, cb) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user?.passwordHash) return cb(null, false);

      if (await validatePassword(password, user.passwordHash))
        return cb(null, user);

      return cb(null, false);
    } catch (err) {
      cb(err);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BE_ORIGIN}/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        const email = profile.emails?.[0].value;

        if (!email) throw new Error("Missing email");

        const name = profile.displayName;

        const user = await prisma.user.upsert({
          where: { email },
          create: { email, googleId: profile.id, name },
          update: { googleId: profile.id, name },
        });

        return cb(null, user);
      } catch (err) {
        return cb(err as string, false);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: `${BE_ORIGIN}/auth/facebook/callback`,
      profileFields: ["id", "email", "displayName"],
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        const email = profile.emails?.[0].value;

        if (!email) throw new Error("Missing email");

        const name = profile.displayName;

        const user = await prisma.user.upsert({
          where: { email },
          create: { email, facebookId: profile.id, name },
          update: { facebookId: profile.id, name },
        });

        return cb(null, user);
      } catch (err) {
        return cb(err as string, false);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, (user as any).id);
});

passport.deserializeUser(async (id: string, cb) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true },
  });

  if (!user) {
    return cb("User not found");
  }

  cb(null, user);
});

export { passport, generatePasswordHash };
