import express from 'express';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const reports = require('./routes/reports');

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost', 'http://localhost:3000'],  // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],                   // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],           // Allowed headers
  credentials: true                                            // Allow credentials (cookies, authorization headers, etc.)
}));

const PORT = process.env.PORT || 8080;

const MAIL_SERVICE_URL = process.env.MAIL_SERVICE_URL || '';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || '';
const WATER_STATION_SERVICE_URL = process.env.WATER_STATION_SERVICE_URL || '';

// app.use("/mail", proxy(MAIL_SERVICE_URL));
app.use('/hello', (req, res) => {
  console.log('Hello from API Gateway');
  res.send('Hello from API Gateway');
});
app.use('/reportservice', reports);
app.use('/user', proxy(USER_SERVICE_URL));
app.use('/water-station', proxy(WATER_STATION_SERVICE_URL));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
