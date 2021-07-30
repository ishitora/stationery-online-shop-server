//商品的model
const mongoose = require('mongoose');
const count = require('./countModel');

const productSchema = new mongoose.Schema({
  numberId: {
    type: String,
  }, //商品的8位數ID
  name: { type: String, require: true, trim: true, maxlength: 50 }, //商品名稱
  category: { type: String, required: true }, //所屬的分類
  images: { type: [String], default: [] }, //商品的圖片
  smallImage: { type: String, default: '' }, //縮圖
  brand: { type: String, require: true, trim: true }, //品牌
  price: { type: Number, default: 0 }, //原價
  priceDiscount: { type: Number, default: 0 }, //折扣後的價格
  stockQuantity: { type: Number, require: true, default: 0 }, //商品庫存
  status: {
    type: String,
    enum: ['可購買', '暫無庫存', '下架中'],
    default: '暫無庫存',
  }, //商品狀態
  details: { type: String, default: '無詳細介紹' }, //詳細商品介紹
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  }, //上架日期
});

//商品建立時(未有ID)則建立加入個ID
productSchema.pre('save', async function (next) {
  if (!this.numberId) {
    const doc = await count
      .findOneAndUpdate(
        {},
        { $inc: { productId: 1 } },
        { upsert: true, new: true }
      )
      .lean();
    this.numberId = doc.productId.toString().padStart(8, '0');
  }

  next();
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
