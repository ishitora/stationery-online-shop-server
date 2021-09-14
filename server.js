const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/dev.env' });

const app = require('./app');
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
