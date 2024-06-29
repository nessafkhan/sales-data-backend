const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    customerId: { type: String, unique: true },
    customerName: String,
    customerEmail: String,
    customerAddress: String,
});

module.exports = mongoose.model('Customer', customerSchema);
