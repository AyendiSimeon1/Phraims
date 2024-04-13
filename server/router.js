cleà
r
  clear
    clear
      const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer');
router.get('/', (req, res) => {
    res.json({ message: 'Hello from Users API' });
})
const swaggerSpec = require('./swaggerConfig.js');
const swaggerUi = require('swagger-ui-express')

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// Signup route
/**
 * @swagger
 *
 *
**/

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({ message: info.message });
      }
      req.login(user, { session: false }, (error) => {
        if (error) return next(error);
        return res.json({ message: 'Login successful', user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Signup route
router.post('/signup', async (req, res, next) => {
  passport.authenticate( async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({ message: info.message });
      }

      // Send email to the user
      sendWelcomeEmail(user.email);

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        return res.status(201).json({ message: 'User created successfully' });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Function to send welcome email
const sendWelcomeEmail = (email) => {
  const transporter = nodemailer.createTransport({
    // Configure your email provider here
    // For example, Gmail SMTP settings:
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Welcome to our service!',
    text: 'Thank you for signing up. We hope you enjoy using our service!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};



// Password reset route
router.post('/password-reset', async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token (you should implement this function)
    const resetToken = generateResetToken();

    // Update user record with the reset token
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        resetToken: resetToken,
      },
    });

    // Send password reset email
    sendPasswordResetEmail(email, resetToken);

    return res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    return next(error);
  }
});

// Function to send password reset email
const sendPasswordResetEmail = (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    // Configure your email provider here
    // For example, Gmail SMTP settings:
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    text: `To reset your password, click the following link: http://yourwebsite.com/reset?token=${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Function to generate a random reset token (replace with your own implementation)
const generateResetToken = () => {
  return Math.random().toString(36).substr(2); // Example: Generate a random string
};



// Profile page route
router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    // Fetch user data from database using req.user.id
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        username: true,
        // Include other fields you want to include in the response
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
