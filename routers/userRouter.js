const express = require('express');

const {
  signUp,
  signIn,
  getUserByToken,
  checkEmail,
} = require('../controllers/userController');

const router = express.Router();

router.route('/signUp').post(signUp);
router.route('/signIn').post(signIn);
router.route('/getUserByToken').get(getUserByToken);
router.route('/checkEmail').post(checkEmail);

module.exports = router;
