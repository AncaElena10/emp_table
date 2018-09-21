var express = require('express');
var router = express.Router();
var passport = require('passport');
var nodemailer = require('nodemailer');
const knex = require('../models/user')

router.post('/register', function (req, res, next) {
  knex
    .from('user')
    .insert({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      verify: req.body.verify,
    })
    .then(() => {
      res.json({ success: true, message: "Data successfully inserted." })
    })
    .catch(() => {
      res.json({ success: false, message: "Error in adding user. Please try again." })
    })
})

// profile
router.get('/profile', function (req, res, next) {
  return res.status(200).json(req.user);
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function (err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({ message: 'Login Success' });
    });
  })(req, res, next);
});

// update user
router.put('/:id', (req, res) => {
  knex
    .from('user')
    .update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      verify: req.body.verify,
      profilePicture: req.body.profilePicture,
      gender: req.body.gender,
      bio: req.body.bio,
      location: req.body.location,
      hobby: req.body.hobby,
      twitterName: req.body.twitterName,
      githubName: req.body.githubName,
      facebookName: req.body.facebookName,
      youtubeName: req.body.youtubeName,
      birthday: req.body.birthday,
      publicBirthday: req.body.publicBirthday,
      phoneNumber: req.body.phoneNumber,
    })
    .where('id', '=', req.body.id)
    .then((user) => {
      if (user > 0) {
        res.json({ success: true, message: "User successfully updated." })
      } else {
        res.json({ success: false, message: "Error in updating user. ID inexistent." })
      }
    })
})

// logout user
router.get('/logout', (req, res) => {
  res.json({ success: true, message: "Logout successfully." })
})

// delete user
router.delete('/:id', (req, res) => {
  knex
    .from('user')
    .where('id', '=', req.params.id)
    .del()
    .then((user) => {
      if (user > 0) {
        res.json({ success: true, message: "User successfully deleted." })
      } else {
        res.json({ success: false, message: "Error in deleting user. ID inexistent." })
      }
    })
})

// send mail
router.post("/send", (req, res) => {
  console.log(req.body)
  const output = `
    <p>You have a new contact req</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.nameSender}</li>
      <li>Email: ${req.body.emailSender}</li>
      <li>Phone: ${req.body.phoneSender}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.messageSender}</p>
  `;

  let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 'some_port_number',
    secure: false,
    auth: {
      user: 'test@example.com',
      pass: 'password'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: '"Nodemailer Contact" <test@example.com>',
    to: "moisa.anca10@gmail.com",
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
})

module.exports = router;
