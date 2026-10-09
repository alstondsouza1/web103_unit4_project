
import express from 'express'
import { pool } from '../config/database.js'

const router = express.Router()

const wheelPrices = {
    Standard: 0,
    Sport: 1500,
    Premium: 3000
}

const interiorPrices = {
    Cloth: 0,
    Leather: 2000,
    Luxury: 4500
}

router.post('/', async (req, res) => {
    const { name, color, wheels, interior } = req.body

    if (
        typeof name !== 'string' ||
        !name.trim() ||
        name.trim().length > 100 ||
        !['Black', 'Red', 'Blue', 'White'].includes(color) ||
        !Object.hasOwn(wheelPrices, wheels) ||
        !Object.hasOwn(interiorPrices, interior)
    ) {
        return res.status(400).json({
            message: 'Please provide valid car customization options.'
        })
    }

    if (wheels === 'Premium' && interior === 'Cloth') {
        return res.status(400).json({
            message: 'Premium Wheels cannot be combined with Cloth Interior.'
        })
    }

    const price = 30000 + wheelPrices[wheels] + interiorPrices[interior]

    try {
        const result = await pool.query(
            `INSERT INTO custom_cars (name, color, wheels, interior, price)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [name.trim(), color, wheels, interior, price]
        )

        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error('Error saving car:', error)
        res.status(500).json({
            message: 'Unable to save car.'
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM custom_cars ORDER BY created_at DESC, id DESC'
        )

        res.status(200).json(result.rows)
    } catch (error) {
        console.error('Error fetching cars:', error)

        res.status(500).json({
            message: 'Unable to fetch cars.'
        })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    if (!/^[1-9]\d*$/.test(id)) {
        return res.status(400).json({
            message: 'Invalid car ID.'
        })
    }

    try {
        const result = await pool.query(
            'SELECT * FROM custom_cars WHERE id = $1',
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Car not found.'
            })
        }

        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error('Error fetching car:', error)

        res.status(500).json({
            message: 'Unable to fetch car.'
        })
    }
})

export default router
