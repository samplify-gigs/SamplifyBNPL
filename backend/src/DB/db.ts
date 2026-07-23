import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL");

    const result = await client.query("SELECT NOW()");
    console.log(result.rows[0]);

    client.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();
