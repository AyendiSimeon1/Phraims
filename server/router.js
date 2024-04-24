
const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer');
const session = require('express-session');
const swaggerSpec = require('./swaggerConfig.js');
const swaggerUi = require('swagger-ui-express')
const axios = require('axios');
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

const GOOGLE_API_KEY = 'AIzaSyCJcZI4jweKNfvTr4v4J6Z3psmnhOf9OS0';

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
  const { email, firstname, lastname, password } = req.body;
  console.log(req.body);

  try {
    const existingUser = await prisma.User.findUnique({
      where: {
        email: 'a@gmail.com',
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
        lastName: lastname,
        password: hashPassword,
      }
      });
      return res.json(newUser, 'User created successfuly');
    } catch(error) {
      console.error('error', error);
      return res.status(500).json({ error: 'Internal Server Error'});
  }
});

// Password reset route
 router.post('/password-reset', async (req, res, next) => {
   try { 
     const { email } = req.body;

     // Find user by email
     const user = await prisma.User.findUnique({
       where: {
         email: email,
       },
            });

     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }

//     // Generate a password reset token (you should implement this function)
     const token = Math.random().toString(36).str(2); 
     const resetToken = await prisma.resetToken.create({
       where: {
         email: email,
       },
       data: {
         token: token,
         expires: new Date(Date.now() + 3600000),
       }
     });

//     // Send password reset email
     sendPasswordResetEmail(email, resetToken);

     return res.status(200).json({ message: 'Password reset email sent successfully' });
   } catch (error) {
     return next(error);
   }
 });

// // Function to send password reset email
 const sendPasswordResetEmail = (email, resetToken) => {
   const transporter = nodemailer.createTransport({
//     // Configure your email provider here
//     // For example, Gmail SMTP settings:
     service: 'gmail',
     auth: {
       user: 'ayendisimeon3@gmail.com',
       pass: '@19Ana156',
     },
   });

   const mailOptions = {
     from: 'ayrndisimeon3@gmail.com',
     to: email,
     subject: 'Password Reset Request',
     text: `To reset your password, click the following link: http://localhost:3000/reset?token=${resetToken}`,
   };

   transporter.sendMail(mailOptions, (error, info) => {
     if (error) {
       console.error('Error sending email:', error);
     } else {
       console.log('Email sent:', info.response);
           }
   });
 };

// // Function to generate a random reset token (replace with your own implementation)
 
router.get('/reset', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const resetToken = await ResetToken.findFirst({
      where: {
        token,
        expires: { gt: Date.now() }, // Check for unexpired token
      },
      include: { user: true }, // Include associated user
    });

    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash new password securely

    await User.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    // Invalidate the used ResetToken
    await ResetToken.delete({ where: { id: resetToken.id } });

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});



router.get('/profile', passport.authenticate('local', { session: false }), async (req, res, next) => {
   try {

     const user = await prisma.User.findUnique({
       where: {
         id: req.user.id,
       },
       select: {
         id: true,
         username: true,

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

router.get('/business/', async (req, res) => {
    const { location } = req.params;
    const url = "https://places.googleapis.com/v1/places:searchText"
    try {
      const response = await axios.get(url);

      // if (!response.data){
      //   return res.status(500).json({message: 'Oh no'})
      // }
      const businessData = response.data

      // const formatedBusiness = businessData.map(businessData => ({
      //   name: businessData.name,
      //   id: businessData.id,
      // }));

      res.json(businessData);


    } catch (error) {
      return console.error(error);
    }
    
});

module.exports = router;

// https://places.googleapis.com/v1/places/GyuEmsRBfy61i59si0?fields=addressComponents&key=YOUR_API_KEY