const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./connections/db');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
