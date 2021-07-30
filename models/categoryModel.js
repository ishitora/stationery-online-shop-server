//商品分類的model

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    //分類的名字
    type: String,
    require: true,
  },
  nameCHT: {
    //分類的中文名稱
    type: String,
    require: true,
  },
  path: {
    //分類的路徑
    type: String,
    require: true,
  },
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
