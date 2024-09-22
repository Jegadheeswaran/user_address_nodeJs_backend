import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const createTables = async () => {
    await client.connect();

    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
    `;

    const createAddressTable = `
        CREATE TABLE IF NOT EXISTS address (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            address VARCHAR(255) NOT NULL
        );
    `;

    try {
        await client.query(createUsersTable);
        await client.query(createAddressTable);
        console.log("Tables created successfully!");
    } catch (error) {
        console.error("Error while creating tables:", error);
    } finally {
        await client.end();
    }
};

console.log(process.env.DATABASE_URL)
createTables();
