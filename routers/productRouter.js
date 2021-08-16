const express = require('express');
const {
  getProductPageData,
  searchProducts,
} = require('../controllers/productController');

const router = express.Router();

router.route('/search').get(searchProducts);
router.route('/:numberId').get(getProductPageData);
module.exports = router;
