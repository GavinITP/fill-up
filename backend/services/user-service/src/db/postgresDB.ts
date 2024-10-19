import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './.env', override: true });

const db = new Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.POSTGRES_PORT || '5433'),
});

const connectToDatabase = async () => {
  try {
    await db.connect();
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export { connectToDatabase, db };
