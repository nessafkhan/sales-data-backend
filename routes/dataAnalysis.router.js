const express = require('express');
const { calculateTotalRevenue } = require('../controllers/dataAnalysis.controller');

const router = express.Router();

router.get('/total-revenue', calculateTotalRevenue);

module.exports = router;