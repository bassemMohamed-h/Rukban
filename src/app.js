import ('express-async-errors');
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import errorHandler from './middlewares/error.middleware.js';


const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api', routes);


// health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// central error handler
app.use(errorHandler);

export default app;
