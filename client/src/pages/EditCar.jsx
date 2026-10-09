
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../App.css'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [carName, setCarName] = useState('')
    const [color, setColor] = useState('Black')
    const [wheels, setWheels] = useState('Standard')
    const [interior, setInterior] = useState('Cloth')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

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

    const totalPrice = 30000 + wheelPrices[wheels] + interiorPrices[interior]
    const isInvalidCombination = wheels === 'Premium' && interior === 'Cloth'

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(`/api/cars/${id}`)
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Unable to load car.')
                }

                setCarName(data.name)
                setColor(data.color)
                setWheels(data.wheels)
                setInterior(data.interior)
            } catch (error) {
                console.error('Error loading car:', error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCar()
    }, [id])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!carName.trim()) {
            alert('Please enter a car name.')
            return
        }

        if (isInvalidCombination) {
            alert('Premium Wheels cannot be combined with Cloth Interior.')
            return
        }

        setSaving(true)

        try {
            const response = await fetch(`/api/cars/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: carName.trim(),
                    color,
                    wheels,
                    interior
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Unable to update car.')
            }

            navigate(`/customcars/${id}`)
        } catch (error) {
            console.error('Error updating car:', error)
            alert(error.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <main className='customize-page'><p>Loading car...</p></main>
    }

    if (error) {
        return (
            <main className='customize-page'>
                <p>{error}</p>
                <Link to='/customcars'>Back to My Cars</Link>
            </main>
        )
    }

    return (
        <main className='customize-page'>
            <h2>Edit Your Car</h2>
            <p>Update your customization options below.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor='carName'>Car Name</label>
                <input
                    id='carName'
                    type='text'
                    value={carName}
                    onChange={(event) => setCarName(event.target.value)}
                    maxLength={100}
                    required
                />

                <label htmlFor='color'>Exterior Color</label>
                <select
                    id='color'
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                >
                    <option value='Black'>Black</option>
                    <option value='Red'>Red</option>
                    <option value='Blue'>Blue</option>
                    <option value='White'>White</option>
                </select>

                <label htmlFor='wheels'>Wheel Type</label>
                <select
                    id='wheels'
                    value={wheels}
                    onChange={(event) => setWheels(event.target.value)}
                >
                    <option value='Standard'>Standard Wheels</option>
                    <option value='Sport'>Sport Wheels (+$1,500)</option>
                    <option value='Premium'>Premium Wheels (+$3,000)</option>
                </select>

                <label htmlFor='interior'>Interior Type</label>
                <select
                    id='interior'
                    value={interior}
                    onChange={(event) => setInterior(event.target.value)}
                >
                    <option value='Cloth'>Cloth Interior</option>
                    <option value='Leather'>Leather Interior (+$2,000)</option>
                    <option value='Luxury'>Luxury Interior (+$4,500)</option>
                </select>

                {isInvalidCombination && (
                    <p style={{ color: '#ff6b6b' }}>
                        Premium Wheels cannot be combined with Cloth Interior.
                    </p>
                )}

                <h3>Total Price: ${totalPrice.toLocaleString()}</h3>

                <button
                    type='submit'
                    disabled={saving || isInvalidCombination}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>

            <Link to={`/customcars/${id}`}>Cancel</Link>
        </main>
    )
}

export default EditCar
