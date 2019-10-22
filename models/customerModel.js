const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        // _id: mongoose.Schema.Types.ObjectId,
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true, required: [true, 'Last Name is required'] }
    },
    { collection: 'customers' } // optional - to match existing collection name
);

// customerSchema.virtual('fullName').get(function () {
//     return this.firstName + ' ' + this.lastName;
// });

module.exports = mongoose.model('Customer', customerSchema);
