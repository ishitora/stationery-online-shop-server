const express = require('express');

const { createOrder } = require('../controllers/orderController');
const { protect } = require('../utils/auth');

const router = express.Router();

router.use(protect);

router.route('/').post(createOrder);

module.exports = router;
