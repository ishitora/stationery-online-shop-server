const express = require('express');

const { protect } = require('../utils/auth');

const {
  getCart,
  updateCart,
  addCart,
  clearCart,
} = require('../controllers/cartController');

const router = express.Router();

router.use(protect); //以下路線須登入才能操作

router
  .route('/cart')
  .get(getCart)
  .patch(addCart)
  .put(updateCart)
  .delete(clearCart);

module.exports = router;
