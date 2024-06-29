const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderId: { type: String, unique: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    dateOfSale: Date,
    quantitySold: Number,
    unitPrice: Number,
    discount: Number,
    shippingCost: Number,
    paymentMethod: String,
    region: String,
});

module.exports = mongoose.model('Order', orderSchema);