const cron = require('node-cron');
const refreshData = require('../helper/refreshData.helper');

const scheduleDataRefresh = () => {
    cron.schedule('0 0 * * *', async () => {
        console.info('Starting scheduled data refresh...');
        await refreshData();
    });
};

module.exports = scheduleDataRefresh;