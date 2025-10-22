require('express-async-errors');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');


const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api', routes);


// health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// central error handler
app.use(errorHandler);

module.exports = app;
