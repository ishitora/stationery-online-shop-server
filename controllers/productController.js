const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

//獲得單個商品的分類列表 ex:鉛筆  文具/書寫用具/鉛筆
const getCategoryList = async (categoryName) => {
  try {
    const doc = await Category.findOne({ name: categoryName }).lean();
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
    const softOption = getSoftOption(req.query.soft);
    const filter = getFilter(req.query);

    let doc = await Product.find({ $and: [filter, categoryFilter] })
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

    //如果有搜尋關鍵字   以關鍵字進行過濾
    if (req.query.keyword) {
      doc = keywordFilter(doc, req.query.keyword);
    }

    const results = doc.length;
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const limitDoc = doc.filter((product, index) => {
      return index + 1 > (page - 1) * limit && index + 1 <= page * limit;
    });

    res.status(200).json({
      results,
      product: limitDoc,
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const getProductPageData = async (req, res) => {
  try {
    let doc = await Product.findOne({ numberId: req.params.numberId })
      .select('-createdAt -__v -smallImage -_id')
      .lean();

    const categoryList = await getCategoryList(doc.category);

    res.status(200).json({
      product: {
        ...doc,
        categoryList: categoryList,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//依照req要求給特定數的隨機資料 純給前端展示用
const getRandomProducts = async (req, res) => {
  try {
    const productCount = req.params.count;
    let doc = await Product.find({ status: '可購買' })
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
    const randomProducts = [];

    for (let i = 0; i < productCount; i++) {
      let randomNum = Math.floor(Math.random() * doc.length);
      randomProducts.push(doc[randomNum]);
      doc.splice(randomNum, 1);
    }

    res.status(200).json({
      product: randomProducts,
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
  let categoryArray = await Category.find({
    $or: [{ name: query }, { path: new RegExp(`,${query},`) }],
  }).lean();
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

const keywordFilter = (productList, keyword) => {
  //mongoDB對中文的文字搜尋效果不佳，用函式手動篩
  const keywordArray = keyword.split(' ');
  const filteredProductList = productList.filter((product) => {
    return keywordArray.every((word) => product.name.includes(word));
  });
  return filteredProductList;
};

const getFilter = (query) => {
  //其他篩選選項 目前只有品牌
  const filter = query.brand ? { brand: query.brand } : {};
  return filter;
};

module.exports = { searchProducts, getProductPageData, getRandomProducts };
