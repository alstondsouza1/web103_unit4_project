import React, { useState } from 'react'
import '../App.css'
import '../css/Showroom.css'

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

const colors = ['Black', 'Red', 'Blue', 'White']
const wheelOptions = ['Standard', 'Sport', 'Premium']
const interiorOptions = ['Cloth', 'Leather', 'Luxury']

const CreateCar = () => {
    const [carName, setCarName] = useState('')
    const [color, setColor] = useState('Black')
    const [wheels, setWheels] = useState('Standard')
    const [interior, setInterior] = useState('Cloth')
    const [activeTab, setActiveTab] = useState('Exterior')
    const [saving, setSaving] = useState(false)

    const totalPrice =
        30000 + wheelPrices[wheels] + interiorPrices[interior]

    const isInvalidCombination =
        wheels === 'Premium' && interior === 'Cloth'

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
                throw new Error(data.message || 'Unable to save car.')
            }

            alert(`Car saved successfully! Car ID: ${data.id}`)
        } catch (error) {
            console.error('Error saving car:', error)
            alert(error.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <main className='showroom-page'>
            <div className='showroom-intro'>
                <h2>Build Your Dream Ride</h2>
                <p>Choose your style. Customize every detail. Make it yours.</p>
            </div>

            <section className='showroom-builder'>
                <form onSubmit={handleSubmit}>
                    <div className='showroom-toolbar'>
                        <div className='showroom-options'>
                            {['Exterior', 'Wheels', 'Interior'].map((tab) => (
                                <button
                                    key={tab}
                                    type='button'
                                    className={`showroom-tab ${
                                        activeTab === tab ? 'selected' : ''
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <div>
                            <label htmlFor='carName'>Car Name</label>
                            <input
                                id='carName'
                                type='text'
                                placeholder='Name your ride'
                                value={carName}
                                maxLength={100}
                                onChange={(event) =>
                                    setCarName(event.target.value)
                                }
                                required
                                style={{
                                    display: 'block',
                                    marginTop: '8px',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    <div className='showroom-panel'>
                        {activeTab === 'Exterior' && (
                            <>
                                <h3>Choose Your Exterior Color</h3>
                                <div className='showroom-swatches'>
                                    {colors.map((option) => (
                                        <button
                                            key={option}
                                            type='button'
                                            className={`showroom-swatch ${
                                                color === option
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                            onClick={() => setColor(option)}
                                            aria-label={`Select ${option} exterior`}
                                            aria-pressed={color === option}
                                            style={{
                                                backgroundColor:
                                                    option.toLowerCase()
                                            }}
                                        />
                                    ))}
                                </div>
                                <p style={{ textAlign: 'center' }}>
                                    Selected: {color}
                                </p>
                            </>
                        )}

                        {activeTab === 'Wheels' && (
                            <>
                                <h3>Choose Your Wheels</h3>
                                <div className='showroom-swatches'>
                                    {wheelOptions.map((option) => (
                                        <button
                                            key={option}
                                            type='button'
                                            className={`showroom-tab ${
                                                wheels === option
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                            onClick={() => setWheels(option)}
                                            aria-pressed={wheels === option}
                                        >
                                            {option}
                                            <br />
                                            +${wheelPrices[option].toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {activeTab === 'Interior' && (
                            <>
                                <h3>Choose Your Interior</h3>
                                <div className='showroom-swatches'>
                                    {interiorOptions.map((option) => (
                                        <button
                                            key={option}
                                            type='button'
                                            className={`showroom-tab ${
                                                interior === option
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                            onClick={() => setInterior(option)}
                                            aria-pressed={interior === option}
                                        >
                                            {option}
                                            <br />
                                            +${interiorPrices[option].toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className='showroom-preview'>
                        <svg
                            role='img'
                            aria-label={`${color} car preview`}
                            viewBox='0 0 500 240'
                            style={{
                                width: '100%',
                                maxWidth: '550px',
                                filter: 'drop-shadow(0 12px 12px rgba(0,0,0,0.5))'
                            }}
                        >
                            <ellipse
                                cx='250'
                                cy='210'
                                rx='210'
                                ry='14'
                                fill='rgba(0,0,0,0.4)'
                            />

                            <path
                                d='M125 135 L175 75 Q185 65 205 65 H320 Q340 65 355 85 L395 135 Z'
                                fill='#263746'
                                stroke='#a0a0a0'
                                strokeWidth='4'
                            />

                            <path
                                d='M180 125 L205 80 H255 V125 Z'
                                fill='#87b8d4'
                            />

                            <path
                                d='M270 80 H320 Q330 80 340 95 L365 125 H270 Z'
                                fill='#87b8d4'
                            />

                            <path
                                d='M65 140 Q75 130 120 130 H395 Q435 130 445 155 L455 185 Q455 195 440 195 H60 Q45 195 45 180 L50 155 Q55 145 65 140 Z'
                                fill={color.toLowerCase()}
                                stroke='#777'
                                strokeWidth='4'
                                style={{ transition: 'fill 0.3s ease' }}
                            />

                            <path
                                d='M260 135 V190 M120 135 L110 165'
                                stroke='#555'
                                strokeWidth='3'
                                fill='none'
                            />

                            <rect
                                x='280'
                                y='145'
                                width='28'
                                height='6'
                                rx='3'
                                fill='#ddd'
                            />

                            <rect
                                x='425'
                                y='150'
                                width='22'
                                height='12'
                                rx='5'
                                fill='#fff4a3'
                            />

                            <rect
                                x='51'
                                y='150'
                                width='18'
                                height='12'
                                rx='5'
                                fill='#ff4d4d'
                            />

                            <circle cx='135' cy='190' r='36' fill='#171717' />
                            <circle cx='135' cy='190' r='21' fill='#aaa' />
                            <circle cx='135' cy='190' r='10' fill='#555' />

                            <circle cx='365' cy='190' r='36' fill='#171717' />
                            <circle cx='365' cy='190' r='21' fill='#aaa' />
                            <circle cx='365' cy='190' r='10' fill='#555' />
                        </svg>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <p>
                            {color} Exterior · {wheels} Wheels · {interior} Interior
                        </p>

                        <div className='showroom-price'>
                            ${totalPrice.toLocaleString()}
                        </div>

                        {isInvalidCombination && (
                            <p
                                role='alert'
                                style={{
                                    color: '#ff6b6b',
                                    marginTop: '15px'
                                }}
                            >
                                Premium Wheels cannot be combined with Cloth
                                Interior. Choose Leather or Luxury instead.
                            </p>
                        )}

                        <div style={{ marginTop: '22px' }}>
                            <button
                                type='submit'
                                disabled={saving || isInvalidCombination}
                                className='showroom-tab selected'
                            >
                                {saving ? 'SAVING...' : 'CREATE MY CAR'}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default CreateCar
