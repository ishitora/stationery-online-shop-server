const User = require('../models/userModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Count = require('../models/countModel');
const Order = require('../models/orderModel');

const categoryData = require('../data/categoryData');
const productData = require('../data/productData');
const diaryData = require('../data/diaryData');
const randomProductsData = require('../data/randomProductsData');

const getAllProduct = async (req, res) => {
  try {
    const doc = await Product.find({});
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const getAllOrder = async (req, res) => {
  try {
    const doc = await Order.find({});
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const addDefaultData = async (req, res) => {
  try {
    await Product.create(productData);
    await Product.create(diaryData);
    await Category.create(categoryData);
    res.status(201).json({ message: '新增完畢' });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const addRandomData = async (req, res) => {
  try {
    await Product.create(randomProductsData);
    res.status(201).json({ message: '新增完畢' });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const deleteAllData = async (req, res) => {
  try {
    await Product.deleteMany({});
    await Count.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    res.status(201).json({ message: '刪除成功' });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const testProtect = async (req, res, next) => {
  if (req.headers.authorization !== process.env.PASSWORD) {
    return res.status(401).send({ message: '有密碼才能操作' });
  }
  next();
};

module.exports = {
  getAllProduct,
  getAllOrder,
  addDefaultData,
  addRandomData,
  deleteAllData,
  testProtect,
};
