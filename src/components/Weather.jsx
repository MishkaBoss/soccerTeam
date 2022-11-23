import { async } from '@firebase/util'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const Weather = ({ weatherData }) => {

    return (
        <div>
            {weatherData.name}
        </div>
    )
}
