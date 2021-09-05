const express = require('express');
const cors = require('cors');

const accountRouter = require('./routers/accountRouter');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const userRouter = require('./routers/userRouter');

const testRouter = require('./routers/testRouter');

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use('/account', accountRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);

app.use('/test', testRouter);

module.exports = app;
