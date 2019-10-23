const Order = require('../models/orderModel');

exports.getOrders = function (req, res, next) {
    Order.find()
    .populate('products', 'price') // remove 'price' to populate all fields in product
    .populate('customer')
    .exec(function (err, result) { 
        if (err) return next(err);
        res.json({ data: result });
    });
};
