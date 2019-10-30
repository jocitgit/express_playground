const customerController = require('../controllers/customerController');
const { sanitizeBody } = require('express-validator');

var express = require('express');
var router = express.Router();

router.get('/orders', customerController.getCustomersIncOrders);

router.get('/', customerController.getCustomers);

router.get('/:customerId', customerController.getCustomer);

router.delete('/:customerId', customerController.deleteCustomer);

router.post('/', customerController.createCustomer); // checks and sanitization in customerController...

router.put('/', [
    sanitizeBody('firstName').trim().escape(), // ... or checks and sanitization here
    sanitizeBody('lastName').trim().escape(),
  ], customerController.updateCustomer);

module.exports = router;
