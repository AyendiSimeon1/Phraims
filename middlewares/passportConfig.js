const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    console.log('Authentication attempt with email:', email); // Log incoming email

    // Fetch user by email
    const user = await prisma.User.findUnique({ where: { email } });

    if (!user) {
      console.log('No user found for email:', email); // Log if user not found
      return done(null, false, { message: 'Incorrect email.' });
    }

    // Uncomment and use this if passwords are hashed and need to be compared
    // const isPasswordValid = bcrypt.compareSync(password, user.password);

    // Use this if passwords are not hashed in the database (not recommended)
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      console.log('Invalid password for email:', email); // Log if password is incorrect
      return done(null, false, { message: 'Incorrect password.' });
    }

    console.log('User authenticated:', user); // Log successful authentication
    return done(null, user);

  } catch (error) {
    console.error('Error during authentication:', error); // Log any unexpected errors
    return done(error); // Pass the error to the next middleware
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
