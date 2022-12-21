import { async } from '@firebase/util'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const Weather = ({ weatherData }) => {
useEffect(() => {
 console.log(weatherData)
}, [])

    return (
        <div className='my-10 w-3/4 text-center shadow-lg rounded-lg bg-gray-50'>
            <h1 className='text-xl md:text-2xl font-bold text-mainColor'>Expected Weather:</h1>
            <p className='text-lg md:text-xl'><span className='font-bold text-lg md:text-xl'>Temperature:</span> {Math.round(weatherData.main.temp)} C°</p>
            <p className='text-lg md:text-xl'><span className='font-bold text-lg md:text-xl'>Feels like:</span> {Math.round(weatherData.main.feels_like)} C°</p>
            <p className='text-lg md:text-xl'> <span className='font-bold text-lg md:text-xl'>Highest will be </span>{Math.round(weatherData.main.temp_max)} C°</p>
            <p className='text-lg md:text-xl'> <span className='font-bold text-lg md:text-xl'>Lowest will be </span>{Math.round(weatherData.main.temp_min)} C°</p>
            
        </div>
    )
}
