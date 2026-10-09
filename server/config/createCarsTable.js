import { pool } from './database.js'

const createCarsTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS custom_cars (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                color VARCHAR(50) NOT NULL,
                wheels VARCHAR(50) NOT NULL,
                interior VARCHAR(50) NOT NULL,
                price INTEGER NOT NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `)

        console.log('Custom cars table created successfully!')
    } catch (error) {
        console.error('Error creating custom cars table:', error.message)
        process.exitCode = 1
    } finally {
        await pool.end()
    }
}

createCarsTable()