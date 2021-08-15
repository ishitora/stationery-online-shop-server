const { Router } = require('express');

const {
  signUp,
  signIn,
  getUserByToken,
  checkEmail,
  protect,
} = require('../controllers/userControllers');

const {
  updateCart,
  addCart,
  clearCart,
} = require('../controllers/cartControllers');

const router = Router();

router.route('/signUp').post(signUp);
router.route('/signIn').post(signIn);
router.route('/getUserByToken').get(getUserByToken);
router.route('/checkEmail').post(checkEmail);

router.use(protect);
//購物車更新需登入
router.route('/cart').patch(addCart).put(updateCart).delete(clearCart);

module.exports = router;
