const Order = require('../models/orderModel');
const Product = require('../models/productModel');

const createOrder = async (req, res) => {
  try {
    const { user } = req;

    if (user.cart.length === 0) {
      return res.status(400).send({ message: '購物車為空' });
    }

    const totalAmount = await calculateTotalAmount(user.cart);

    const doc = await Order.create({
      buyerId: user.id,
      products: user.cart,
      address: req.body.address,
      totalAmount,
    });
    return res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const calculateTotalAmount = async (cart) => {
  const productId = cart.map((product) => {
    return product.productId;
  });

  const productList = await Product.find({ numberId: { $in: productId } })
    .select({
      numberId: 1,
      priceDiscount: 1,
      _id: 0,
    })
    .lean();

  const productObj = {};
  productList.map((product) => {
    productObj[product.numberId] = product.priceDiscount;
  });

  const totalAmount = cart.reduce((accumulator, currentValue) => {
    return (
      accumulator + productObj[currentValue.productId] * currentValue.quantity
    );
  }, 0);

  return totalAmount;
};

module.exports = {
  createOrder,
};
