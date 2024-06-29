const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./connections/db');
const scheduleDataRefresh = require('./schedulers/refreshData.scheduler');
const salesRoutes = require('./routes/sales.router');
const analysisRoutes = require('./routes/dataAnalysis.router');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

// routes
app.use('/api/data', salesRoutes);
app.use('/api/analysis', analysisRoutes);

//schedule refresh cron
scheduleDataRefresh();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
