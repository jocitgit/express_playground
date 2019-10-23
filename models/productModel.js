const mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema(
    {
        productName: { type: String, trim: true },
        price: { type: mongoose.Schema.Types.Decimal128, default: 0 }
    },
    { 
        collection: 'products' // optional - to match existing collection name
    } 
);

module.exports = mongoose.model('Product', ProductSchema);
