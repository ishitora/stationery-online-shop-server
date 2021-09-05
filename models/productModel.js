//商品的model
const mongoose = require('mongoose');
const count = require('./countModel');

const productSchema = new mongoose.Schema({
  numberId: {
    //商品的8位數ID
    type: String,
  },
  name: {
    //商品名稱
    type: String,
    require: true,
    trim: true,
    maxlength: 50,
  },
  category: {
    //所屬的分類
    type: String,
    required: true,
  },
  images: {
    //商品的圖片
    type: [String],
    default: [],
  },
  smallImage: {
    //縮圖
    type: String,
    default: '',
  },
  brand: {
    //品牌
    type: String,
    require: true,
    trim: true,
  },
  price: {
    //原價
    type: Number,
    default: 0,
  },
  priceDiscount: {
    //折扣後的價格
    type: Number,
    default: 0,
  },
  stockQuantity: {
    //商品庫存
    type: Number,
    require: true,
    default: 0,
  },
  status: {
    //商品狀態
    type: String,
    enum: ['可購買', '暫無庫存', '下架中'],
    default: '暫無庫存',
  },
  details: {
    //商品介紹
    type: String,
    default: '無詳細介紹',
  },
  createdAt: {
    //上架日期
    type: Date,
    default: Date.now(),
  },
});

productSchema.index({ numberId: 1 });

//商品建立時(未有數字ID)則建立加入數字ID
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
