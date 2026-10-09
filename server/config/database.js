import pg from 'pg'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

dotenv.config({
    path: fileURLToPath(new URL('../.env', import.meta.url))
})

const pool = new pg.Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT || 5432),
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
})

export { pool }