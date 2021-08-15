const express = require('express');

const Product = require('./models/productModel');
const Category = require('./models/categoryModel');
const Count = require('./models/countModel');
const User = require('./models/userModel');

const productData = require('./data/productData');
const categoryData = require('./data/categoryData');

const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');
const app = express();

//開發測試用的路由

app.use(express.json());
app.use('/product', productRouter);
app.use('/user', userRouter);

app.get('/alldata', async (req, res) => {
  try {
    const doc = await Product.find({});
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.post('/add', async (req, res) => {
  try {
    const doc = await Product.create(productData);
    await Category.create(categoryData);
    res.status(201).json({ message: JSON.stringify(doc) });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.delete('/deleteall', async (req, res) => {
  try {
    await Product.deleteMany({});
    await Count.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    res.status(201).json({ message: '刪除成功' });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

module.exports = app;
