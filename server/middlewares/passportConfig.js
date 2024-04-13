const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

passport.use(new LocalStrategy(async (email, password, done) => {
  try {
    const user = await prisma.User.findUnique({ where:
       { email: email },
       });
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    
    return done(null, user);
    
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.User.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
