const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productId: { type: String, unique: true },
    productName: String,
    category: String,
});

module.exports = mongoose.model('Product', productSchema);
