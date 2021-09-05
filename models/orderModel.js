const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyerId: {
    //訂單的買家ID
    type: String,
    require: true,
  },
  name: {
    //收貨人姓名
    type: String,
    require: true,
  },

  productList: {
    //商品列表
    type: [{ productId: String, quantity: Number }],
    default: [],
  },
  phoneNumber: {
    //手機
    type: String,
  },
  totalAmount: {
    //訂單總金額
    type: Number,
    require: true,
  },
  paymentMethod: {
    //付款方式
    type: String,
    enum: ['貨到付款', '信用卡', '超商取貨'],
    default: '貨到付款',
  },
  postCode: {
    //郵遞區號
    type: String,
  },
  address: {
    //收貨地址
    type: String,
  },
  status: {
    //訂單狀態
    type: String,
    enum: ['處理中', '已出貨', '已完成'],
    default: '處理中',
  },
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
