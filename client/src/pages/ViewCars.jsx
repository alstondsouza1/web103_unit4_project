import React, { useEffect, useState } from 'react'
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

            {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

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
                        maxWidth: '450px'
                    }}
                >
                    <h3>{car.name}</h3>

                    <div
                        role='img'
                        aria-label={`${car.color} car color preview`}
                        style={{
                            backgroundColor: car.color.toLowerCase(),
                            width: '100%',
                            height: '70px',
                            borderRadius: '10px',
                            border: '1px solid gray',
                            marginBottom: '15px'
                        }}
                    />

                    <p>Color: {car.color}</p>
                    <p>Wheels: {car.wheels}</p>
                    <p>Interior: {car.interior}</p>

                    <h3>${car.price.toLocaleString()}</h3>
                </div>
            ))}
        </main>
    )
}

export default ViewCars
