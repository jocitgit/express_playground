const orderController = require('../controllers/orderController');
var express = require('express');
var router = express.Router();

router.get('/', orderController.getOrders);

module.exports = router;
