import { connectToDatabase } from './db/postgresDB';
import express from 'express';
import userRouter from './routes/user.routes';
import cors from 'cors';

const app = express();

connectToDatabase().catch((error) => {
  console.error('Error connecting to the database:', error);
});

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

const PORT = process.env.PORT || 5002;
const server = app.listen(PORT, () => {
  console.log('Server running in', process.env.NODE_ENV, 'made on port', PORT);
});

process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
