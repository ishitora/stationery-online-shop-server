const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

console.log(process.env.NODE_ENV);

mongoose
  .connect('mongodb://localhost:27017/stationeryshop', {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen('5000', () => {
      console.log('連結成功  http://localhost:5000');
    });
  })
  .catch((error) => {
    console.error('連結失敗', error);
  });
