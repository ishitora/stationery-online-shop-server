const express = require('express');
const {
  getProductPageData,
  searchProducts,
  getRandomProducts,
} = require('../controllers/productController');

const router = express.Router();

router.route('/search').get(searchProducts);
router.route('/:numberId').get(getProductPageData);
router.route('/random/:count').get(getRandomProducts);
module.exports = router;
