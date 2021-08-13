const product = require('../models/productModel');
const category = require('../models/categoryModel');

//獲得單個商品的分類列表 ex:鉛筆  文具/書寫用具/鉛筆
const getCategoryList = async (categoryName) => {
  try {
    const doc = await category.findOne({ name: categoryName }).lean();
    const categoryList = doc.path.split(',');
    categoryList.shift();
    categoryList[categoryList.length - 1] = doc.name;
    return categoryList;
  } catch (e) {
    console.error(e);
    return '';
  }
};

const searchProducts = async (req, res) => {
  try {
    const categoryFilter = await getCategoryArray(req.query.category);
    const softOption = getSoftOption(req.query.s);
    const filter = getFilter(req.query);

    let doc = await product
      .find({ $and: [filter, categoryFilter] })
      .sort(softOption)
      .select({
        numberId: 1,
        name: 1,
        status: 1,
        price: 1,
        priceDiscount: 1,
        smallImage: 1,
        _id: 0,
      })
      .lean();

    const results = doc.length;

    res.status(200).json({
      status: 'success',
      results,
      data: {
        data: doc,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const getProductPageData = async (req, res) => {
  try {
    let doc = await product
      .findOne({ numberId: req.params.numberId })
      .select('-createdAt -__v -smallImage -_id')
      .lean();

    const results = doc.length;
    const categoryList = await getCategoryList(doc.category);

    res.status(200).json({
      status: 'success',
      results,
      data: {
        ...doc,
        categoryList: categoryList,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const getCategoryArray = async (query) => {
  if (!query) {
    return {};
  }
  let categoryArray = await category
    .find({
      $or: [{ name: query }, { path: new RegExp(`,${query},`) }],
    })
    .lean();
  categoryArray = categoryArray.map((categoryDoc) => categoryDoc.name);

  return { category: { $in: categoryArray } };
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

const getFilter = (query) => {
  //其他篩選選項 目前只有品牌
  const filter = query.b ? { brand: query.b } : {};
  return filter;
};

module.exports = { searchProducts, getProductPageData };
