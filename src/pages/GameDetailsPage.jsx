import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { weatherService } from '../services/weatherService'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Weather } from '../components/Weather'
import { db } from '../services/firebase'
import { storageService } from '../services/storageService'

export const GameDetailsPage = () => {
    const [game, setGame] = useState(null)
    const [docId, setDocId] = useState("")
    const [weatherData, setWeatherData] = useState([])
    const params = useParams()

    useEffect(() => {
        fetchGame()
        fetchWeatherData(33.242194, 35.571543)

    }, [params.id])


    const fetchGame = async () => {
        const gameId = params.id
        const q = query(collection(db, "games"), where("gameId", "==", gameId))
        const docs = await getDocs(q)
        const data = docs.docs[0].data()
        const dataId = docs.docs[0].id
        setDocId(dataId)
        console.log(data)
        setGame({ ...data })
    }

    const fetchWeatherData = async (lat, long) => {
        const data = storageService.load('weather_db')
        console.log(`fetchWeatherData ~ data`, data)
        if (!data) {
            weatherService.getWeather(lat, long)
        }
        setWeatherData({ ...data })

    }

    const addPlayer = async () => {

    }


    if (!game) return <div>Loading... </div>
    return (
        <div>

            <h3>{game.gameDate}</h3>
            <h3>{game.gameTime}</h3>
            <h3>{game.players.length}</h3>
            <Weather weatherData={weatherData} />
            <h1>{docId}</h1>
            <button>Join Game</button>
        </div>
    )
}
