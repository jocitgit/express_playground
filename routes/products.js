const productController = require('../controllers/productController');
var express = require('express');
var router = express.Router();

router.get('/', productController.getProducts);

module.exports = router;
