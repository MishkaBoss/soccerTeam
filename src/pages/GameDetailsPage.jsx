import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { weatherService } from '../services/weatherService'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Weather } from '../components/Weather'
import { auth, db } from '../services/firebase'
import { storageService } from '../services/storageService'
import { useAuthState } from 'react-firebase-hooks/auth'

export const GameDetailsPage = () => {
    const [game, setGame] = useState(null)
    const [docId, setDocId] = useState("")
    const [weatherData, setWeatherData] = useState([])
    const [isJoined, setIsJoined] = useState()
    const [name, setName] = useState("")
    const [user, loading, error] = useAuthState(auth);
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('did mount1')
        fetchGame()
        fetchWeatherData(33.242194, 35.571543)

    }, [params.id])

    useEffect(() => {
        console.log(`did mount2`)
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
        console.log(name)
        fetchArrivalState(docId, user.uid)
        console.log(`GameDetailsPage ~ isJoined`, isJoined)
    }, [game, isJoined])


    const fetchArrivalState = async (docId, userId) => {
        const ref = doc(db, "games", docId)
        const snap = await getDoc(ref)
        const arrivingPlayers = snap.data().players
        console.log(`fetchArrivalState ~ arrivingPlayers`, arrivingPlayers)
        const isArriving = arrivingPlayers.some(player => player.userId === userId)
        setIsJoined(isArriving)
        console.log(`fetchArrivalState ~ isArriving`, isArriving)
    }

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
        if (!data) {
            weatherService.getWeather(lat, long)
        }
        setWeatherData({ ...data })

    }

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data()
            setName(data.name);
            console.log(`fetchUserName ~ data.name`, data.name)
        } catch (err) {
            console.error(err.message);
            alert("An error occured while fetching user data");
        }
    }

    const addPlayerToGame = async (docId, userName, userId) => {
        console.log(userName, userId)
        const ref = doc(db, "games", docId)
        const snap = await getDoc(ref)
        const arrivingPlayers = snap.data().players
        const isArriving = arrivingPlayers.some(player => player.userId === userId)
        console.log(`addPlayerToGame ~ isArriving`, isArriving)
        if (isArriving === false) { //is arriving false
            console.log(`if - isArriving is ${isArriving}`)
            await updateDoc(ref, {
                players: arrayUnion({ userId, userName })
            })
            setIsJoined(true)
            console.log(`isJoined is ${isJoined} and player added to the array`)
        } else if (isArriving === true) {
            await updateDoc(ref, {
                players: arrayRemove({ userName, userId })
            })
            // console.log(`else - isArriving is ${isArriving}`)
            setIsJoined(false)
            console.log(`isJoined is ${isJoined} and player removed from the array`)
        }
        // if (!isArriving) {
        //     console.log(`addPlayerToGame ~ isArriving`, isArriving)
        //     await updateDoc(ref, {
        //         players: arrayUnion({ userName, userId })
        //     })
        //     setIsJoined(true)
        //     console.log(isJoined)
        // } else if (isArriving) {
        //     console.log(`addPlayerToGame ~ isArriving`, isArriving)
        //     await updateDoc(ref, {
        //         players: arrayRemove({ userName, userId })
        //     })
        //     setIsJoined(false)
        //     console.log(`already confirmed`)
        // }

    }


    if (!game) return <div>Loading... </div>
    return (
        <div className='flex flex-col items-center mt-5'>
            <h1 className='text-3xl md:text-5xl font-bold text-mainColor my-3'>Game Details</h1>
            <h3 className='text-xl md:text-2xl my-1'> <span className='font-bold text-2xl md:text-3xl'>Date:</span> {game.gameDate}</h3>
            <h3 className='text-xl md:text-2xl mb-1'><span className='font-bold text-2xl md:text-3xl'>Time:</span>  {game.gameTime}</h3>
            <h3 className='text-xl md:text-2xl'><span className='font-bold text-2xl md:text-3xl'>Arriving Players:</span>  {game.players.length}</h3>
            <Weather weatherData={weatherData} />
            <button className='button button-main' onClick={() => { addPlayerToGame(docId, name, user.uid) }}>{isJoined ? `Can't come` : `Join game`}</button>
        </div>
    )
}
