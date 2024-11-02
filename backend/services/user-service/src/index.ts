import { connectToDatabase } from './db/postgresDB';
import express from 'express';
import userRouter from './routes/user.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
const { xss } = require('express-xss-sanitizer');

const app = express();

connectToDatabase().catch((error) => {
  console.error('Error connecting to the database:', error);
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);
app.use(hpp());

app.use('/', userRouter);

const PORT = process.env.PORT || 5002;
const server = app.listen(PORT, () => {
  console.log('Server running in', process.env.NODE_ENV, 'made on port', PORT);
});

process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
