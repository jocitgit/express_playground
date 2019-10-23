const Product = require('../models/productModel');

exports.getProducts = function (req, res, next) {
    Product.find(function (err, result) {
        if (err) return next(err);
        res.json({ data: result });
    });
};
