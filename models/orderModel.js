const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  buyerId: {
    //訂單的買家ID
    type: String,
    require: true,
  },
  products: { type: [{ productId: String, quantity: Number }], default: [] },
  totalAmount: {
    //訂單總金額
    type: Number,
    require: true,
  },
  status: {
    type: String,
    enum: ['處理中', '已出貨', '已完成'],
    default: '處理中',
  }, //訂單狀態
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
