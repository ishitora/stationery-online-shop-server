//開發測試用的路由

const express = require('express');
const {
  getAllProduct,
  getAllOrder,
  addDefaultData,
  addRandomData,
  deleteAllData,
} = require('../controllers/testController');

const router = express.Router();

router.route('/getAllProduct').get(getAllProduct);
router.route('/getAllOrder').get(getAllOrder);
router.route('/addDefaultData').post(addDefaultData);
router.route('/addRandomData').post(addRandomData);
router.route('/delete').delete(deleteAllData);
module.exports = router;
