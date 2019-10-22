const customerController = require('../controllers/customerController');
var express = require('express');
var router = express.Router();

router.get('/', customerController.getCustomers);

router.get('/:customerId', customerController.getCustomer);

router.delete('/:customerId', customerController.deleteCustomer);

router.post('/', customerController.createCustomer);

router.put('/', customerController.updateCustomer);

module.exports = router;
