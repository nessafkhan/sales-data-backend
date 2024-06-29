const { calculateTotalRevenueInPeriod } = require('../dao/order.dao');

/**
 * GET:
 * Get the start and end date from response
 * Aggregate the Order collection for calculating revenue
 * @param {Request} req 
 * @param {Response} res 
 */
exports.calculateTotalRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const totalRevenue = calculateTotalRevenueInPeriod(startDate, endDate);
    return res.status(200).json(totalRevenue);
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
};
