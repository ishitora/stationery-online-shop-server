const mongoose = require('mongoose');

const app = require('./app');

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config({ path: './config/dev.env' });
}

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`連結成功`);
    });
  })
  .catch((error) => {
    console.error('連結失敗', error);
  });
