const mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema(
    {
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        orderDate: { type: Date, default: Date.now }, 
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        customerId: { type: mongoose.Schema.Types.ObjectId } // alternative for virtual in customerModel
    },
    { collection: 'orders', // optional - to match existing collection name
      toObject: { virtuals: true }, 
      toJSON: { virtuals: true } 
    } 
);

OrderSchema.virtual('totalPrice').get(function () {
    return this.products.reduce(((total, product) => total + parseFloat(product.price)), 0); // only populated when products are populated
});

module.exports = mongoose.model('Order', OrderSchema);
