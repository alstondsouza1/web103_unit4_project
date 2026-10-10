import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('/api/cars')

                if (!response.ok) {
                    throw new Error('Unable to load cars.')
                }

                const data = await response.json()
                setCars(data)
            } catch (error) {
                console.error('Error fetching cars:', error)
                setError('Unable to load your saved cars.')
            } finally {
                setLoading(false)
            }
        }

        fetchCars()
    }, [])

    return (
        <main className='customize-page'>
            <h2>My Custom Cars</h2>
            <p>Check out all the cars you've customized!</p>

            {loading && <p>Loading your cars...</p>}

            {error && (
                <p style={{ color: '#ff6b6b' }}>
                    {error}
                </p>
            )}

            {!loading && !error && cars.length === 0 && (
                <p>No cars saved yet. Customize your first car!</p>
            )}

            {!loading && !error && cars.map((car) => (
                <div
                    key={car.id}
                    style={{
                        border: '1px solid #555',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '20px',
                        width: '100%',
                        maxWidth: '450px',
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        textAlign: 'center'
                    }}
                >
                    <h3>{car.name}</h3>

                    <svg
                        role='img'
                        aria-label={`${car.color} car preview`}
                        viewBox='0 0 500 240'
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            height: 'auto',
                            margin: '15px auto',
                            filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.4))'
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
                            fill={car.color.toLowerCase()}
                            stroke='#777'
                            strokeWidth='4'
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
                    </svg>

                    <p>Color: {car.color}</p>
                    <p>Wheels: {car.wheels}</p>
                    <p>Interior: {car.interior}</p>

                    <h3>${car.price.toLocaleString()}</h3>

                    <Link
                        to={`/customcars/${car.id}`}
                        style={{
                            display: 'inline-block',
                            marginTop: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#800000',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        View Details
                    </Link>
                </div>
            ))}
        </main>
    )
}

export default ViewCars
