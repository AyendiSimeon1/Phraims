
const express = require('express');
const router = express.Router();
require('dotenv').config()
const passport = require('./middlewares/passportConfig.js');
const nodemailer = require('nodemailer');
const session = require('express-session');
const swaggerSpec = require('./swaggerConfig.js');
const swaggerUi = require('swagger-ui-express')
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const prisma = new PrismaClient();
const bodyParser = require('body-parser');

router.use(
  session({
    secret: 'admin', // Choose a strong secret key
    resave: false, // Avoid session resaving if unchanged
    saveUninitialized: false, // Avoid saving uninitialized sessions
  })
);

router.use(bodyParser.json());
router.use(express.json());
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

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return next(err); 
    }

    if (!user) {
      console.log('User not found or incorrect credentials:', info);
      return res.redirect('/'); 
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error('Login error:', loginErr);
        return next(loginErr);
      }

      console.log('User authenticated:', user);
      return res.status(200).json(); 
    });
  })(req, res, next); 
});



router.post('/signup', async (req, res, next) => {
  const { email, firstname, lastname, password } = req.body;
  console.log(req.body);

  try {
    const existingUser = await prisma.User.findUnique({
      where: {
        email: email,
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
        password: password,
      }
      });
      return res.status(201).json({newUser: 'User created successfuly' });
    } catch(error) {
      console.error('error', error);
      return res.status(500).json({ error: 'Internal Server Error'});
  }
});

router.post('/password-reset', async (req, res, next) => {
   try { 
     const { email } = req.body;
     const user = await prisma.User.findUnique({
       where: { email },
            });

     if (!user) {
       return res.status(404).json({ message: 'User does not exitst' });
     }

     const token = Math.random().toString(36).str(2); 
     const resetToken = await prisma.resetToken.create({
       where: {
         email
       },
       data: {
         token: token,
         expires: new Date(Date.now() + 3600000),
       }
     });

//    
     sendPasswordResetEmail(email, resetToken);

     return res.status(200).json({ message: 'Password reset email sent successfully' });
   } catch (error) {
     return next(error);
   }
 });


 const sendPasswordResetEmail = (email, resetToken) => {
   const transporter = nodemailer.createTransport({

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

router.get('/reset', async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

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

    //const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash new password securely

    await User.update({
      where: { id: resetToken.userId },
      data: { password: newPassword },
    });


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

router.get('/email-finder/', async (req, res) => {
    const { domain } = req.body;
    const apiKey = process.env.HUNTER_API_KEY
    const url =  `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${apiKey}`;
    try {
      
      const response = await axios.get(url);
      const domainData = response.data;
      if (!response.data) {
        res.status(200).json({ message: 'No data found for the provided domain' });
      }

      const emailOne = domainData.data?.emails[0]?.value
      const firstNameOne = domainData.data?.emails[0].first_name
      const lastNameOne = domainData?.data?.emails[0].last_name

      const emailTwo = domainData.data?.emails[1]?.value;
      const firstNameTwo = domainData.data?.emails[1].first_name
      const lastNameTwo = domainData?.data?.emails[1].last_name

      const emailThree = domainData.data?.emails[2]?.value;
      const firstNameThree = domainData.data?.emails[2].first_name
      const lastNameThree = domainData?.data?.emails[2].last_name
   

      const user = await prisma.User.update({
        where : { email: 'simeon@gmail.com' },
        
        data: {
          fetchedData : {
            create: {
              emailOne: emailOne,
              firstNameOne: firstNameOne,
              lastNameOne: lastNameOne,
              emailTwo: emailTwo,
              firstNameTwo: firstNameTwo,
              lastNameTwo: lastNameTwo,
              emailThree: emailThree,
              firstNameThree: firstNameThree,
              lastNameThree: lastNameThree
            }
            

          }
          
        }
      })
      res.json(user);
    } catch (error) {
      return console.error(error);
    }
    
});

module.exports = router;