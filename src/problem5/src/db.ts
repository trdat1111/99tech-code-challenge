import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password1",
    database: process.env.DB_NAME || "resource_99tech",
    charset: "utf8mb4",
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
);
`;

(async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query(createTableQuery);
        console.log("✅ Table 'resources' checked/created successfully");
    } catch (error) {
        console.error("❌ Error creating table: ", error);
    } finally {
        connection.release();
    }
})();

export const db = drizzle(pool);
