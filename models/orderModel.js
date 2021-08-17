const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
  paymentMethod: {
    type: String,
    enum: ['貨到付款', '信用卡', '超商取貨'],
    default: '貨到付款',
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ['處理中', '已出貨', '已完成'],
    default: '處理中',
  }, //訂單狀態
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
