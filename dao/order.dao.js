const Order = require('../models/order.model');

const calculateTotalRevenueInPeriod = async (startDate, endDate) => {
     return await Order.aggregate([
          {
              $match: {
                  dateOfSale: {
                      $gte: new Date(startDate),
                      $lte: new Date(endDate)
                  }
              }
          },
          {
              $project: {
                  revenue: {
                      $add: [
                          { $multiply: ["$unitPrice", "$quantitySold"] },
                          "$shippingCost",
                          { $multiply: [-1, "$discount"] }
                      ]
                  }
              }
          },
          {
              $group: {
                  _id: null,
                  totalRevenue: { $sum: "$revenue" }
              }
          }
      ]);
};

module.exports = { calculateTotalRevenueInPeriod }