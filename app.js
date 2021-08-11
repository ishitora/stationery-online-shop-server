const express = require('express');
const product = require('./models/productModel');
const category = require('./models/categoryModel');
const count = require('./models/countModel');
const productData = require('./data/productData');
const categoryData = require('./data/categoryData');

const productRouter = require('./routers/productRouter');
const app = express();

//開發測試用的路由

app.use('/', productRouter);

app.get('/', (req, res) => {
  res.send({ message: 'hello world ' });
});

app.get('/alldata', async (req, res) => {
  try {
    const doc = await product.find({});
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.post('/add', async (req, res) => {
  try {
    const doc = await product.create(productData);
    await category.create(categoryData);
    res.status(201).json({ message: JSON.stringify(doc) });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.delete('/deleteall', async (req, res) => {
  try {
    await product.deleteMany({});
    await count.deleteMany({});
    await category.deleteMany({});
    res.status(201).json({ message: '刪除成功' });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

module.exports = app;
