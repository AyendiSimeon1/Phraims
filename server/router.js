
const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer');
const session = require('express-session');
const swaggerSpec = require('./swaggerConfig.js');
const swaggerUi = require('swagger-ui-express')

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

router.use(express.json());
router.use(session({
  secret: 'admin',
  resave: false,
  //saveUnitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());


router.get('/', (req, res) => {
  res.json({ message: 'Hello from Users API' });
})
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// Signup route
/**
 * @swagger
 *
 *
**/

router.post('/login', passport.authenticate('local'), (req, res) =>{
  res.json({ user: req.user });
})

// Signup route
router.post('/signup', async (req, res, next) => {
  const { email, firstname, password } = req.body;
  console.log(req.body);

  try {
    const existingUser = await prisma.User.findUnique({
      where: {
        email: email
      }
      
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    } 

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.User.create ({
      data:{
        email: email,
        firstName: firstname,
        password: hashPassword,
      }
      });
      return res.json(newUser);
    } catch(error) {
      console.error('error', error);
      return res.status(500).json({ error: 'Internal Server Error'});
  }
});
// Function to send welcome email
// const sendWelcomeEmail = (email) => {
//   const transporter = nodemailer.createTransport({
//     // Configure your email provider here
//     // For example, Gmail SMTP settings:
//     service: 'gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-password',
//     },
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Welcome to our service!',
//     text: 'Thank you for signing up. We hope you enjoy using our service!',
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };



// // Password reset route
// router.post('/password-reset', async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     // Find user by email
//     const user = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate a password reset token (you should implement this function)
//     const resetToken = generateResetToken();

//     // Update user record with the reset token
//     await prisma.user.update({
//       where: {
//         email: email,
//       },
//       data: {
//         resetToken: resetToken,
//       },
//     });

//     // Send password reset email
//     sendPasswordResetEmail(email, resetToken);

//     return res.status(200).json({ message: 'Password reset email sent successfully' });
//   } catch (error) {
//     return next(error);
//   }
// });

// // Function to send password reset email
// const sendPasswordResetEmail = (email, resetToken) => {
//   const transporter = nodemailer.createTransport({
//     // Configure your email provider here
//     // For example, Gmail SMTP settings:
//     service: 'gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-password',
//     },
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Password Reset Request',
//     text: `To reset your password, click the following link: http://yourwebsite.com/reset?token=${resetToken}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// // Function to generate a random reset token (replace with your own implementation)
// const generateResetToken = () => {
//   return Math.random().toString(36).substr(2); // Example: Generate a random string
// };



// // Profile page route
// router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
//   try {
//     // Fetch user data from database using req.user.id
//     const user = await prisma.user.findUnique({
//       where: {
//         id: req.user.id,
//       },
//       select: {
//         id: true,
//         username: true,
//         // Include other fields you want to include in the response
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     return res.json({ user });
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;
