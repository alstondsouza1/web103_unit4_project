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
                    <option value='Standard'>
                        Standard Wheels
                    </option>
                    <option value='Sport'>
                        Sport Wheels (+$1,500)
                    </option>
                    <option value='Premium'>
                        Premium Wheels (+$3,000)
                    </option>
                </select>

                <label htmlFor='interior'>Interior Type</label>
                <select
                    id='interior'
                    value={interior}
                    onChange={(event) => setInterior(event.target.value)}
                >
                    <option value='Cloth'>
                        Cloth Interior
                    </option>
                    <option value='Leather'>
                        Leather Interior (+$2,000)
                    </option>
                    <option value='Luxury'>
                        Luxury Interior (+$4,500)
                    </option>
                </select>

                <button
                    type='submit'
                    disabled={isInvalidCombination}
                >
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

            <svg
                role='img'
                aria-label={`${color} car preview`}
                viewBox='0 0 500 240'
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    height: 'auto',
                    marginBottom: '20px',
                    filter: 'drop-shadow(0 12px 12px rgba(0,0,0,0.5))'
                }}
            >
                {/* Car shadow */}
                <ellipse
                    cx='250'
                    cy='210'
                    rx='210'
                    ry='14'
                    fill='rgba(0,0,0,0.4)'
                />

                {/* Car roof */}
                <path
                    d='M125 135 L175 75 Q185 65 205 65 H320 Q340 65 355 85 L395 135 Z'
                    fill='#263746'
                    stroke='#a0a0a0'
                    strokeWidth='4'
                />

                {/* Front window */}
                <path
                    d='M180 125 L205 80 H255 V125 Z'
                    fill='#87b8d4'
                />

                {/* Rear window */}
                <path
                    d='M270 80 H320 Q330 80 340 95 L365 125 H270 Z'
                    fill='#87b8d4'
                />

                {/* Car body */}
                <path
                    d='M65 140 Q75 130 120 130 H395 Q435 130 445 155 L455 185 Q455 195 440 195 H60 Q45 195 45 180 L50 155 Q55 145 65 140 Z'
                    fill={color.toLowerCase()}
                    stroke='#777'
                    strokeWidth='4'
                    style={{
                        transition: 'fill 0.3s ease'
                    }}
                />

                {/* Door lines */}
                <path
                    d='M260 135 V190 M120 135 L110 165'
                    stroke='#555'
                    strokeWidth='3'
                    fill='none'
                />

                {/* Door handle */}
                <rect
                    x='280'
                    y='145'
                    width='28'
                    height='6'
                    rx='3'
                    fill='#ddd'
                />

                {/* Headlight */}
                <rect
                    x='425'
                    y='150'
                    width='22'
                    height='12'
                    rx='5'
                    fill='#fff4a3'
                />

                {/* Taillight */}
                <rect
                    x='51'
                    y='150'
                    width='18'
                    height='12'
                    rx='5'
                    fill='#ff4d4d'
                />

                {/* Front wheel */}
                <circle
                    cx='365'
                    cy='190'
                    r='36'
                    fill='#171717'
                />
                <circle
                    cx='365'
                    cy='190'
                    r='21'
                    fill='#aaa'
                />
                <circle
                    cx='365'
                    cy='190'
                    r='10'
                    fill='#555'
                />

                {/* Rear wheel */}
                <circle
                    cx='135'
                    cy='190'
                    r='36'
                    fill='#171717'
                />
                <circle
                    cx='135'
                    cy='190'
                    r='21'
                    fill='#aaa'
                />
                <circle
                    cx='135'
                    cy='190'
                    r='10'
                    fill='#555'
                />
            </svg>
        </main>
    )
}

export default CreateCar
