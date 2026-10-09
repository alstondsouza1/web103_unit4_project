import React, { useState } from 'react'
import '../App.css'

const CreateCar = () => {
    const [carName, setCarName] = useState('')
    const [color, setColor] = useState('Black')
    const [wheels, setWheels] = useState('Standard')
    const [interior, setInterior] = useState('Cloth')

    // Base car price
    const basePrice = 30000

    // Wheel upgrade prices
    const wheelPrices = {
        Standard: 0,
        Sport: 1500,
        Premium: 3000
    }

    // Interior upgrade prices
    const interiorPrices = {
        Cloth: 0,
        Leather: 2000,
        Luxury: 4500
    }

    // Calculate total price
    const totalPrice =
        basePrice +
        wheelPrices[wheels] +
        interiorPrices[interior]

    // Check for an invalid combination
    const isInvalidCombination =
        wheels === 'Premium' && interior === 'Cloth'

    // Handle form submission
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isInvalidCombination) {
            alert('Premium Wheels cannot be combined with Cloth Interior.')
            return
        }

        if (!carName.trim()) {
            alert('Please enter a car name.')
            return
        }

        try {
            const response = await fetch('/api/cars', {
                method: 'POST',
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
                alert(data.message || 'Unable to save car.')
                return
            }

            alert(`Car saved successfully! Car ID: ${data.id}`)
        } catch (error) {
            console.error('Error saving car:', error)
            alert('Could not connect to the server.')
        }
    }

    return (
        <main className='customize-page'>
            <h2>Customize Your Car</h2>
            <p>Build your dream car by choosing your favorite options.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor='carName'>Car Name</label>
                <input
                    type='text'
                    id='carName'
                    placeholder='Enter your car name'
                    value={carName}
                    onChange={(event) => setCarName(event.target.value)}
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

                <button type='submit' disabled={isInvalidCombination}>
                    Save My Car
                </button>
            </form>

            <h3>Your Selection</h3>
            <p>Car Name: {carName || 'Not entered yet'}</p>
            <p>Exterior Color: {color}</p>
            <p>Wheel Type: {wheels}</p>
            <p>Interior Type: {interior}</p>

            <h3>Total Price</h3>
            <h2>${totalPrice.toLocaleString()}</h2>

            {isInvalidCombination && (
                <p
                    style={{
                        color: '#ff6b6b',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                >
                    Premium Wheels cannot be combined with Cloth Interior.
                    Please choose Leather or Luxury Interior.
                </p>
            )}

            <h3>Car Color Preview</h3>

            <div
                role='img'
                aria-label={`${color} car color preview`}
                style={{
                    backgroundColor: color.toLowerCase(),
                    width: '250px',
                    height: '120px',
                    borderRadius: '20px',
                    border: '2px solid gray',
                    marginBottom: '20px',
                    transition: 'background-color 0.3s ease'
                }}
            ></div>
        </main>
    )
}

export default CreateCar
