const multer = require('multer');
const refreshData = require('../helper/refreshData.helper');

const upload = multer({ dest: 'uploads/' });

exports.uploadCSV = upload.single('file');

/**
 * POST: 
 * Process the csv file using fs module
 * Store the processed data in DB
 * @param {Request} req 
 * @param {Response} res 
 * @returns response message
 */
exports.refreshDatabase = async (req, res) => {
  try {
    const filePath = req.file.path;
    await refreshData(filePath);
    return res.status(200).json({ message: 'Data refreshed successfully' });
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
};
