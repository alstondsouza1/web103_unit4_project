import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deleting, setDeleting] = useState(false)

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

    const handleDelete = async () => {
        if (!car || deleting) return

        const confirmed = window.confirm(
            `Are you sure you want to delete "${car.name}"? This cannot be undone.`
        )

        if (!confirmed) return

        setDeleting(true)

        try {
            const response = await fetch(`/api/cars/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Unable to delete car.')
            }

            navigate('/customcars')
        } catch (error) {
            console.error('Error deleting car:', error)
            alert(error.message)
            setDeleting(false)
        }
    }

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

            <Link
                to={`/edit/${car.id}`}
                style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: '#800000',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    marginBottom: '15px'
                }}
            >
                Edit Car
            </Link>

            <button
                type='button'
                onClick={handleDelete}
                disabled={deleting}
                style={{
                    backgroundColor: '#b91c1c',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    cursor: deleting ? 'not-allowed' : 'pointer'
                }}
            >
                {deleting ? 'Deleting...' : 'Delete Car'}
            </button>

            <Link to='/customcars'>
                Back to My Cars
            </Link>
        </main>
    )
}

export default CarDetails
