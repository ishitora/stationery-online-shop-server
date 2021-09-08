const mongoose = require('mongoose');
//const dotenv = require('dotenv');
const app = require('./app');

//dotenv.config({ path: './config/dev.env' });

console.log(process.env.NODE_ENV);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`連結成功  http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('連結失敗', error);
  });
