import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../services/firebase'
import { useNavigate } from 'react-router-dom'

export const CreateGamePage = () => {

    const [gameDate, setGameDate] = useState("")
    const [gameTime, setGameTime] = useState("")
    const [maxPlayers, setMaxPlayers] = useState("")

    const gamesCollectionRef = collection(db, "games")

    const navigate = useNavigate()


    const createNewGame = async (ev) => {
        const ref = doc(gamesCollectionRef)
        console.log(ref);
        ev.preventDefault()
        await addDoc(gamesCollectionRef, {
            gameId: ref.id,
            gameDate,
            gameTime,
            maxPlayers,
            players: [],
            awaiting: []
        })
        navigate("/dashboard")
    }

    return (
        <div>
            <form action="">
                <label htmlFor="date">Game Date:</label>
                <input required value={gameDate} onChange={(e) => setGameDate(e.target.value)} type="date" name='date' id='date' />
                <br />
                <label htmlFor="time">Game Time:</label>
                <input required value={gameTime} onChange={(e) => setGameTime(e.target.value)} type="time" name='time' id='time' />
                <br />
                <label htmlFor="max-players">Max Players:</label>
                <input value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} type="number" name='max-players' id='max-players' />
                <br />
                <button onClick={createNewGame}>Create Game!</button>

            </form>
        </div>
    )
}
