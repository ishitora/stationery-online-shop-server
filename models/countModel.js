//儲存商品用的數字ID
const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
  productId: {
    type: Number,
    require: true,
    default: 0,
  },
});

const Count = mongoose.model('count', countSchema);

module.exports = Count;
