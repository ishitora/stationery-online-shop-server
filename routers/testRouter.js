//開發測試用的路由

const express = require('express');
const {
  getAllProduct,
  getAllOrder,
  addDefaultData,
  addRandomData,
  deleteAllData,
} = require('../controllers/testController');

//測試用route需要密碼
const protect = async (req, res, next) => {
  if (req.headers.authorization !== process.env.PASSWORD) {
    return res.status(401).send({ message: '有密碼才能操作' });
  }
  next();
};

const router = express.Router();

router.use(protect);

router.route('/getAllProduct').get(getAllProduct);
router.route('/getAllOrder').get(getAllOrder);
router.route('/addDefaultData').post(addDefaultData);
router.route('/addRandomData').post(addRandomData);
router.route('/delete').delete(deleteAllData);
module.exports = router;
