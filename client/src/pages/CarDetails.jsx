
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(`/api/cars/${id}`)
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Unable to load car.')
                }

                setCar(data)
            } catch (error) {
                console.error('Error fetching car:', error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCar()
    }, [id])

    if (loading) {
        return (
            <main className='customize-page'>
                <p>Loading car details...</p>
            </main>
        )
    }

    if (error || !car) {
        return (
            <main className='customize-page'>
                <h2>Car Details</h2>
                <p>{error || 'Car not found.'}</p>
                <Link to='/customcars'>Back to My Cars</Link>
            </main>
        )
    }

    return (
        <main className='customize-page'>
            <h2>{car.name}</h2>
            <p>Here are the details of your customized car!</p>

            <div
                role='img'
                aria-label={`${car.color} car color preview`}
                style={{
                    backgroundColor: car.color.toLowerCase(),
                    width: '100%',
                    maxWidth: '400px',
                    height: '140px',
                    borderRadius: '15px',
                    border: '2px solid gray',
                    marginBottom: '20px'
                }}
            />

            <h3>Customization Details</h3>

            <p>Exterior Color: {car.color}</p>
            <p>Wheel Type: {car.wheels}</p>
            <p>Interior Type: {car.interior}</p>

            <h3>Total Price</h3>
            <h2>${car.price.toLocaleString()}</h2>

            <Link to='/customcars'>Back to My Cars</Link>
        </main>
    )
}

export default CarDetails
