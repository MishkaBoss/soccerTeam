import { collection, deleteDoc, doc, getDoc, getDocs, Query, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../services/firebase'

export const GamePreview = ({ game, name }) => {
    const gamesCollectionRef = collection(db, "games")



    const deleteGame = async (id) => {
        const q = query(collection(db, "games"), where("gameId", "==", id))
        const docs = await getDocs(q)
        const data = docs.docs[0].id
        console.log(data)
        const docRef = doc(db, "games", data)
        deleteDoc(docRef)
    }




    return (
        <div className='flex flex-col justify-center rounded-md items-center w-5/6 sm:w-3/4 h-64 shadow-xl mb-5 mx-auto'>
            <Link to={`/dashboard/${game.gameId}`} name={name}>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-bold text-mainColor'>When?</h1>
                    <h2 className='text-xl'><span className='font-bold'>Date:</span> {game.gameDate}</h2>
                    <h2 className='text-xl'><span className='font-bold'>Time:</span> {game.gameTime}</h2>
                    <h2 className='text-xl'><span className='font-bold'>Confirmed Players:</span> {game.players.length}</h2>
                    {/* <h2>{game.id}</h2> */}
                </div></Link>

            <section className="actions">
                <button className='button button-main'
                    onClick={() => { deleteGame(game.gameId) }}>
                    Delete Game
                </button>
            </section>
        </div>
    )
}
