import express from 'express';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import jwtAuth from './middlewares/jwtAuth';

const reports = require('./routes/reports');

dotenv.config();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});

const app = express();
app.use(express.json());
app.use(limiter);
app.use(cors());
app.use(helmet());

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || '';
const WATER_STATION_SERVICE_URL = process.env.WATER_STATION_SERVICE_URL || '';

app.use('/report-service', jwtAuth, reports);
app.use('/user', proxy(USER_SERVICE_URL));
app.use('/water-station', jwtAuth, proxy(WATER_STATION_SERVICE_URL));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
