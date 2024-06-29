const express = require('express');
const { uploadCSV, refreshDatabase } = require('../controllers/sales.controller');

const router = express.Router();

router.post('/upload', uploadCSV, refreshDatabase);

module.exports = router;