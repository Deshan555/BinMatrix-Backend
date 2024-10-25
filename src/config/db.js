const mongoose = require('mongoose');
const username = process.env.USERNAMED;
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = process.env.CLUSTER;
const options = process.env.OPTIONS.split(',').filter(option => !option.includes('retryWrites')).join('&');
const dbName = process.env.DB_NAME;
const logger = require('./logger');
const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?${options}`;

const connectDB = async () => {
    try {
      await mongoose.connect(uri);
      logger.info('MongoDB connected');
    } catch (err) {
      logger.error(err.message);
      process.exit(1);
    }
};

module.exports = connectDB;