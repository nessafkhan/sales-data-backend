const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_CONNECTION_URL);
		console.log('DB connected successfully');
	} catch (error) {
		console.log(`Something went wrong... ${error}`);
		process.exit(1);
	}
};

module.exports = connectDB;