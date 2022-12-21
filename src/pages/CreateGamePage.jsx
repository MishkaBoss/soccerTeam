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
            <form action="" className=''>
                <div className='flex flex-col gap-4 text-center'>
                <label className='font-bold text-2xl w-25 w-3/4 mx-auto' htmlFor="date">Game Date:</label>
                <input  className='border-none w-3/4 mx-auto' required={true} value={gameDate} onChange={(e) => setGameDate(e.target.value)} type="date" name='date' id='date' pattern=''/>
                </div>
                
               <div className='flex flex-col gap-4 text-center'> 
                <label className='font-bold text-2xl w-3/4 mx-auto' htmlFor="time">Game Time:</label>
                <input className='border-none w-3/4 mx-auto' required value={gameTime} onChange={(e) => setGameTime(e.target.value)} type="time" name='time' id='time' /></div>
                
               <div className='flex flex-col gap-4 text-center'>
               <label className='font-bold text-2xl w-3/4 mx-auto' htmlFor="max-players">Max Players:</label>
                <input className='border rounded w-3/4 mx-auto' value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} type="number" name='max-players' id='max-players' />
               </div>
                
                <div className='flex'>
                <button className='button button-main w-1/2 mx-auto' onClick={createNewGame}>Create Game!</button>
                </div>

            </form>
        </div>
    )
}
