//開發測試用的路由

const express = require('express');
const {
  getAllProduct,
  getAllOrder,
  addDefaultData,
  addRandomData,
  deleteAllData,
  testProtect,
} = require('../controllers/testController');

const router = express.Router();

//測試用route需要密碼
if (process.env.NODE_ENV !== 'development') {
  router.use(testProtect);
}

router.route('/getAllProduct').get(getAllProduct);
router.route('/getAllOrder').get(getAllOrder);
router.route('/addDefaultData').post(addDefaultData);
router.route('/addRandomData').post(addRandomData);
router.route('/delete').delete(deleteAllData);
module.exports = router;
