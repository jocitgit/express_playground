const mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema(
    {
        // _id: mongoose.Schema.Types.ObjectId,
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true, required: [true, 'Last Name is required'] }, 
        // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] // anti-pattern: avoid mutable growing arrays
    },
    { collection: 'customers', // optional - to match existing collection name
      toObject: { virtuals: true }, 
      toJSON: { virtuals: true } 
    } 
);

CustomerSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

CustomerSchema.virtual('orders', {
    ref: 'Order', // The model to use
    localField: '_id', // Find people where `localField`
  //  foreignField: 'customerId', // is equal to `foreignField`OR - 
    foreignField: 'customer', // only contains customer id if not populated
    justOne: false, // default
    options: {} // Query options, see http://bit.ly/mongoose-query-options
  });
  

module.exports = mongoose.model('Customer', CustomerSchema);
