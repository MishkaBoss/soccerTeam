import axios from "axios"
import { storageService } from './storageService'


const REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5'
const REACT_APP_API_KEY = 'a44668c101a940178a7d08f387ab6d12'
const REACT_APP_ICON_URL = 'https://openweathermap.org/img/w'

const DB_KEY = 'weather_db'

const getWeather = async (lat, long) => {
    const { data } = await axios.get(`${REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`)
    console.log(`loaded from service`)
    storageService.store(DB_KEY, data)
    return data
}
export const weatherService = {
    getWeather,
}

