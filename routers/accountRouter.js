const express = require('express');

const { protect } = require('../utils/auth');

const {
  getCart,
  updateCart,
  addCart,
  deleteCart,
  clearCart,
  getAddress,
  addAddress,
  deleteAddress,
} = require('../controllers/accountController');

const router = express.Router();

router.use(protect); //以下路線須登入才能操作

router
  .route('/cart')
  .get(getCart)
  .post(addCart)
  .put(updateCart)
  .patch(deleteCart);

router.route('/clearCart').delete(clearCart);

router
  .route('/address')
  .get(getAddress)
  .patch(addAddress)
  .delete(deleteAddress);

module.exports = router;
