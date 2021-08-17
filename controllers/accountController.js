//處理需登入的各種操作
const User = require('../models/userModel');

const getCart = async (req, res) => {
  try {
    return res.status(201).json({ status: 'success', data: req.user.cart });
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

    return res.status(201).json({ status: 'success', data: newCart });
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

    return res.status(201).json({ status: 'success', data: doc.cart });
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

const getAddress = async (req, res) => {
  try {
    return res.status(201).json({ status: 'success', data: req.user.address });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const addAddress = async (req, res) => {
  try {
    const { user } = req;
    let newAddress;
    if (user.address.includes(req.body.address)) {
      newAddress = user.address;
    } else {
      const doc = await User.findByIdAndUpdate(
        user,
        { address: [...user.address, req.body.address] },
        { new: true }
      )
        .lean()
        .exec();
      newAddress = doc.address;
    }

    return res.status(201).json({ status: 'success', data: newAddress });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { user } = req;

    if (user.address.includes(req.body.address)) {
      const newAddress = user.address.filter(
        (item) => item !== req.body.address
      );
      await User.findByIdAndUpdate(user, { address: newAddress }, { new: true })
        .lean()
        .exec();
      return res.status(204).end();
    } else {
      return res.status(204).end();
    }
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

module.exports = {
  updateCart,
  addCart,
  clearCart,
  getCart,
  getAddress,
  addAddress,
  deleteAddress,
};
