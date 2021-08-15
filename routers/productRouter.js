const express = require('express');
const {
  getProductPageData,
  searchProducts,
} = require('../controllers/productControllers');

const router = express.Router();

// router.param('id', tourController.checkID);

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews

router.route('/search').get(searchProducts);
router.route('/:numberId').get(getProductPageData);
module.exports = router;
