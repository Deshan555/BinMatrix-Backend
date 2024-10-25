require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const logger = require('./config/logger');
const connectDB = require('./config/db');
// const Rules = require('./src/services/ruleService');
// const Validation = require('./src/services/ruleValidationService');
// const Execution = require('./src/services/ruleExecutor');
const buildingRoutes = require('./routes/buildings');
const app = express();
const PORT = process.env.PORT || 3001;

connectDB().then(r => logger.info('Connected to MongoDB')).catch(err => logger.error(err));
app.use(express.json({ extended: false }));

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.get('/error', (req, res, next) => {
  const error = new Error('Something went wrong!');
  error.status = 500;
  next(error);
});

app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}, 
  });
});

// app.use('/api/v01', Rules);
// app.use('/api/v01', Validation);
// app.use('/api/v01', Execution);

app.use('/api/v01/buildings', buildingRoutes);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
