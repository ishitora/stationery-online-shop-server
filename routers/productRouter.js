const express = require('express');
const productControllers = require('../controllers/productControllers');

const router = express.Router();

// router.param('id', tourController.checkID);

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews

router.route('/search').get(productControllers);

module.exports = router;
