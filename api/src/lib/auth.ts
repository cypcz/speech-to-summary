import argon from "argon2";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../prisma";

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

      if (!user) return cb(null, false);

      if (await validatePassword(password, user.passwordHash))
        return cb(null, user);

      return cb(null, false);
    } catch (err) {
      cb(err);
    }
  })
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
