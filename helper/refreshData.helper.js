const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Customer = require('../models/customer.model');

/**
 * Read the data from csv
 * Create respective Maps for store in DB
 * After everything set to insert
 * Start a mongo DB session for transactions  { https://www.mongodb.com/docs/manual/reference/server-sessions/ }
 * @param {string} filePath 
 */
const refreshData = async (filePath) => {
    try {
        const orders = [];
        const products = new Map();
        const customers = new Map();

        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    const order = {
                        orderId: row['Order ID'],
                        productId: row['Product ID'],
                        customerId: row['Customer ID'],
                        dateOfSale: new Date(row['Date of Sale']),
                        quantitySold: parseInt(row['Quantity Sold']),
                        unitPrice: parseFloat(row['Unit Price']),
                        discount: parseFloat(row['Discount']),
                        shippingCost: parseFloat(row['Shipping Cost']),
                        paymentMethod: row['Payment Method'],
                        region: row['Region'],
                    };
                    orders.push(order);

                    if (!products.has(row['Product ID'])) {
                        products.set(row['Product ID'], {
                            productId: row['Product ID'],
                            productName: row['Product Name'],
                            category: row['Category'],
                        });
                    }

                    if (!customers.has(row['Customer ID'])) {
                        customers.set(row['Customer ID'], {
                            customerId: row['Customer ID'],
                            customerName: row['Customer Name'],
                            customerEmail: row['Customer Email'],
                            customerAddress: row['Customer Address'],
                        });
                    }
                })
                .on('end', resolve)
                .on('error', reject);
        });

        // It's time to start a session
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await Order.deleteMany({}).session(session);
            await Product.deleteMany({}).session(session);
            await Customer.deleteMany({}).session(session);

            await Order.insertMany(orders, { session });
            await Product.insertMany(Array.from(products.values()), { session });
            await Customer.insertMany(Array.from(customers.values()), { session });

            await session.commitTransaction();
            console.info('Data refreshed successfully');
        } catch (error) {
            await session.abortTransaction();
            console.error('Transaction aborted due to error:', error.message);
        } finally {
            session.endSession();
        }

    } catch (err) {
        console.error('Error in refreshData function:', err.message);
    }
};

module.exports = refreshData;