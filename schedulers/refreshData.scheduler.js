const cron = require('node-cron');
const refreshData = require('../helper/refreshData.helper');

const scheduleDataRefresh = () => {
  cron.schedule('*/1 * * * *', async () => {
    console.info('Starting scheduled data refresh...');
    await refreshData();
  });
};

module.exports = scheduleDataRefresh;