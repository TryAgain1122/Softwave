import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { dbConnect } from './config/dbConnect';
import cors from 'cors';
import authRoute from './routes/authRoute';

dbConnect();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use('/api/auth/', authRoute)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
