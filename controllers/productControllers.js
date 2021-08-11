const product = require('../models/productModel');
const category = require('../models/categoryModel');

const searchProducts = async (req, res) => {
  try {
    if (!req.query.category) {
      return res.status(400).end();
    }

    const categoryArray = await getCategoryArray(req.query.category);
    const softOption = getSoftOption(req.query.s);

    let doc = await product
      .find({ category: { $in: categoryArray } })
      .sort(softOption)
      .lean();

    console.log(doc);
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const getCategoryArray = async (query) => {
  let categoryArray = await category
    .find({
      $or: [{ name: query }, { path: new RegExp(`,${query},`) }],
    })
    .lean();
  console.log('陣列1', categoryArray);
  categoryArray = categoryArray.map((categoryDoc) => categoryDoc.name);
  console.log('陣列2', categoryArray);
  return categoryArray;
};

const getSoftOption = (query) => {
  const softOptions = [
    { numberId: -1 },
    { numberId: 1 },
    { priceDiscount: -1 },
    { priceDiscount: 1 },
  ]; //順序 上架新到舊 舊到新 價格高到低 低到高
  const select =
    parseInt(query) >= 0 && parseInt(query) < softOptions.length
      ? parseInt(query)
      : 0;

  return softOptions[select];
};

module.exports = searchProducts;
