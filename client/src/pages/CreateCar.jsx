import React, { useState } from 'react'
import '../App.css'

const CreateCar = () => {
    const [carName, setCarName] = useState('')
    const [color, setColor] = useState('Black')

    return (
        <main className='container'>
            <h2>Customize Your Car</h2>
            <p>Build your dream car by choosing your favorite options.</p>

            <form>
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
            </form>

            <h3>Your Selection</h3>
            <p>Car Name: {carName || 'Not entered yet'}</p>
            <p>Exterior Color: {color}</p>
        </main>
    )
}

export default CreateCar