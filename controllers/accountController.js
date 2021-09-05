//處理需登入的各種操作
const User = require('../models/userModel');
const Product = require('../models/productModel');

const getCart = async (req, res) => {
  try {
    const cartData = await getProductListByCart(req.user.cart);
    return res.status(201).json({ cart: cartData });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//使用使用者的購物車 來獲取完整購物車資料
const getProductListByCart = async (cart) => {
  try {
    const numberIdArray = cart.map((product) => product.productId);

    const res = await Product.find({ numberId: { $in: numberIdArray } })
      .select({
        _id: 0,
        name: 1,
        smallImage: 1,
        priceDiscount: 1,
        numberId: 1,
      })
      .lean();

    const cartList = res.map((product) => {
      return {
        ...product,
        quantity: cart.find((p) => p.productId === product.numberId).quantity,
      };
    });

    return cartList;
  } catch (e) {
    console.error(e);
  }
};

const addCart = async (req, res) => {
  try {
    const { user } = req;
    console.log(req.body);
    const repeated = user.cart.find(
      (item) => item.productId === req.body.productId
    );
    let newCart;
    if (repeated) {
      //有重複的
      newCart = user.cart.filter(
        (item) => item.productId !== req.body.productId
      );
      repeated.quantity += parseInt(req.body.quantity);
      newCart.push(repeated);
    } else {
      newCart = [
        ...user.cart,
        {
          productId: req.body.productId,
          quantity: parseInt(req.body.quantity),
        },
      ];
    }

    const newUser = await User.findByIdAndUpdate(
      user,
      { cart: newCart },
      { new: true }
    )
      .select('-_id -password -__v -createdAt -updatedAt')
      .lean()
      .exec();
    console.log(newUser);
    return res.status(201).json({ cart: newUser.cart });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const updateCart = async (req, res) => {
  try {
    const { user } = req;

    let newCart = user.cart.filter(
      (item) => item.productId !== req.body.productId
    );
    newCart.push(req.body);

    const newUser = await User.findByIdAndUpdate(
      user,
      { cart: newCart },
      { new: true }
    )
      .select('-_id -password -__v -createdAt -updatedAt')
      .lean()
      .exec();

    return res.status(201).json({ cart: newUser.cart });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const deleteCart = async (req, res) => {
  try {
    const { user } = req;
    console.log(req.body);
    const newCart = user.cart.filter(
      (item) => item.productId !== req.body.productId
    );

    const newUser = await User.findByIdAndUpdate(
      user,
      { cart: newCart },
      { new: true }
    )
      .select('-_id -password -__v -createdAt -updatedAt')
      .lean()
      .exec();

    console.log(newCart);
    return res.status(201).json({ cart: newUser.cart });
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
    return res.status(201).json({ address: req.user.address });
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

    return res.status(201).json({ address: newAddress });
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
  deleteCart,
  clearCart,
  getCart,
  getAddress,
  addAddress,
  deleteAddress,
  getProductListByCart,
};
