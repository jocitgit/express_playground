var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost:27017';

const Customer = require('./models/customerModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');

mongoose.connect(mongoUrl, { useNewUrlParser: true, dbName: 'mydb' });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// var products = [
//     { productName: 'book', price: 1.99 },
//     { productName: 'toy', price: 5.25 },
//     { productName: 'pen', price: 0.75 }
// ];
// Product.create(products, function (err, result) {
//     if (err) console.log(err);
//     console.log('products added: ' + JSON.stringify(result));
//     mongoose.connection.close();
// });

// Product.find(function(err, productResult) {
//     if (err) console.log(err);
//     Customer.find(function(err, customerResult) {
//         if (err) console.log(err);
//         var orders = [
//             { products: productResult, customer: customerResult[0] },
//             { products: [ productResult[0] ], customer: customerResult[1] },
//             { products: [ productResult[1] ], customer: customerResult[1] },
//             { products: [ productResult[1], productResult[2] ], customer: customerResult[2] }
//         ];
//         Order.create(orders, function (err, result) {
//             if (err) console.log(err);
//             console.log('orders added');
//             mongoose.connection.close();
//         });
//     });
// });
var order = {
    products: [ 
        mongoose.Types.ObjectId('5db025428f034a300c86a68e'), 
        mongoose.Types.ObjectId('5db025428f034a300c86a690') ], 
    customer: mongoose.Types.ObjectId('5db051eb868f115704b6617c'), 
    customerId: mongoose.Types.ObjectId('5db051eb868f115704b6617c')
};
Order.create(order, function (err, result) {
    if (err) console.log(err);
    console.log('order added');
    mongoose.connection.close();
});







