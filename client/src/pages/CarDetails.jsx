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

            <svg
                role='img'
                aria-label={`${car.color} car preview`}
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
