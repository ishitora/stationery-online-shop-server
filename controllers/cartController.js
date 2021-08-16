const User = require('../models/userModel');

const getCart = async (req, res) => {
  try {
    return res.status(201).send({ cart: req.user.cart });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const addCart = async (req, res) => {
  try {
    const { user } = req;
    //找出是否有重複的
    const repeated = user.cart.filter(
      (item) => item.productId === req.body.productId
    );
    let newCart;
    if (repeated.length === 1) {
      //有重複的
      newCart = user.cart.filter(
        (item) => item.productId !== req.body.productId
      );
      repeated[0].quantity += parseInt(req.body.quantity);
      newCart.push(repeated[0]);
    } else {
      newCart = [
        ...user.cart,
        {
          productId: req.body.productId,
          quantity: parseInt(req.body.quantity),
        },
      ];
    }

    await User.findByIdAndUpdate(user, { cart: newCart }, { new: true })
      .select('-_id -password -__v -createdAt -updatedAt')
      .lean()
      .exec();

    return res.status(201).send({ newCart });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const updateCart = async (req, res) => {
  try {
    const { user } = req;

    const doc = await User.findByIdAndUpdate(
      user,
      { cart: req.body },
      { new: true }
    )
      .select('-_id -password -__v -createdAt -updatedAt')
      .lean()
      .exec();

    return res.status(201).send({ cart: doc.cart });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const clearCart = async (req, res) => {
  try {
    const { user } = req;

    await User.findByIdAndUpdate(user, { cart: [] }, { new: true })
      .select('-_id -password -__v -createdAt -updatedAt')
      .lean()
      .exec();

    return res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

module.exports = { updateCart, addCart, clearCart, getCart };
