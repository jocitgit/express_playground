const Customer = require('../models/customerModel');

exports.getCustomers = function (req, res, next) {
    var query = Customer.find();
    query.select('-__v'); // mongoose internal versioning for concurrency issue resolution
    query.sort({ lastName: 'asc' });
    query.exec(function (err, result) {
        if (err) return next(err);
        res.json({ data: result });
    });
};

exports.getCustomersIncOrders = function (req, res, next) {
    Customer.find()
    .populate({ path: 'orders', populate: { path: 'products', select: 'price productName -_id' } } ) // nested populating
    .exec(function (err, result) { 
        if (err) return next(err);
        res.json({ data: result });
    });
};

exports.getCustomer = function (req, res, next) {
    Customer.findById(req.params.customerId, function (err, result) { // handles undefined and ObjectId cast
        if (err) return next(err);
        res.json({ data: result });
    });
};
  
 exports.deleteCustomer = function (req, res, next) {
    Customer.findByIdAndDelete(req.params.customerId, function (err, result) { // handles undefined and ObjectId cast
        if (err) return next(err);
        res.json({ data: result });
    });
  };
  
exports.createCustomer = function (req, res, next) {
    var customer = req.body;
    Customer.create(customer, function (err, result) { 
        if (err) return next(err);
        res.json({ data: result });
    });
  };
  
  exports.updateCustomer = function (req, res, next) {
    var customer = req.body;
    Customer.findByIdAndUpdate(customer._id, { firstName: customer.firstName, lastName: customer.lastName }, function (err, result) { // handles undefined and ObjectId cast
        if (err) return next(err);
        res.json({ data: result });
    });
  };
  