import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const dbConnect = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to postgreSql");
    client.release();
  } catch (error) {
    console.log("postgreSql Connection error: ", error)
  }
};

export { pool, dbConnect }
