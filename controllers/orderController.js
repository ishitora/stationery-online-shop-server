const Order = require('../models/orderModel');
const { getProductListByCart } = require('./accountController');

const createOrder = async (req, res) => {
  try {
    const { user } = req;

    if (user.cart.length === 0) {
      return res.status(400).send({ message: '購物車為空' });
    }
    const productList = await getProductListByCart(user.cart);
    const totalAmount = calculateTotalAmount(productList);

    const doc = await Order.create({
      buyerId: user.id,
      ...req.body,
      productList,
      totalAmount,
    });

    return res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const calculateTotalAmount = (productList) => {
  return productList.reduce(
    (acc, cur) => acc + cur.quantity * cur.priceDiscount,
    0
  );
};

module.exports = {
  createOrder,
};
