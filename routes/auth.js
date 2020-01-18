const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private: will need token protection
router.get('/', auth, async (req, res) => {
  /**
   * When calling a protected routek, and include second
   * arg 'auth', it calls the auth function in middleware dir.
   *
   * if we send the correct token and are logged in
   * this request object will have a user object
   * with logged in users I.D.
   */
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Valid email required').isEmail(),
    check('password', 'Password required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // Find user in mongoDb
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials: email' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials: password' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      // Sign and generae a token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        // callback
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.messaage);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
