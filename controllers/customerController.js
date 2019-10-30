const Customer = require('../models/customerModel');
const { sanitizeBody, check, validationResult } = require('express-validator');
const validation = require('../validation.js');

exports.getCustomers = function (req, res, next) {
    var query = Customer.find();
    query.select('-__v'); // mongoose internal versioning for concurrency issue resolution
    query.sort({ lastName: 'asc' });
    query.exec(function (err, result) {
        // if (err) return next(err);
        if (err) {
            res.json(err);
        } else {
            res.json({ data: result });
        }
    });
};

exports.getCustomersIncOrders = function (req, res, next) {
    Customer.find()
        .populate({ path: 'orders', populate: { path: 'products', select: 'price productName -_id' } }) // nested populating
        .exec(function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({ data: result });
            }
        });
};

exports.getCustomer = function (req, res, next) {
    Customer.findById(req.params.customerId, function (err, result) { // handles undefined and ObjectId cast
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ data: result });
        }
    });
};

exports.deleteCustomer = function (req, res, next) {
    Customer.findByIdAndDelete(req.params.customerId, function (err, result) { // handles undefined and ObjectId cast
        if (err) {
            res.json(err);
        } else {
            res.json({ data: result });
        }
    });
};

exports.createCustomer = [ // array of middleware functions - called in order
    check('firstName').custom(value => { // custom validator
        if (!validation.doSomeChecks(value)) { // could also be async function / db query - return Promise.reject(msg)
            throw new Error('Some checks failed - first name too short');
        }
        return true;
    }),
    sanitizeBody('firstName').trim().escape(),
    sanitizeBody('lastName').trim().escape(),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ errors: errors });
            return;
        }
        var customer = req.body;
        Customer.create(customer, function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({ data: result });
            }
        });
    }
];

exports.updateCustomer = function (req, res, next) {
    var customer = req.body;
    Customer.findByIdAndUpdate(customer._id, { firstName: customer.firstName, lastName: customer.lastName }, { runValidators: true }, function (err, result) { // handles undefined and ObjectId cast
        if (err) {
            res.json(err);
        } else {
            res.json({ data: result });
        }
    });
};
