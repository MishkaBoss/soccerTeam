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
        <div>
            <Link to={`/dashboard/${game.gameId}`} name={name}>
                <div className='when'>
                    <h1>When?</h1>
                    <h2>{game.gameDate}</h2>
                    <h2>{game.gameTime}</h2>
                    {/* <h2>{game.id}</h2> */}
                </div></Link>

            <section className="actions">
                <button
                    onClick={() => { deleteGame(game.gameId) }}>
                    Delete Game
                </button>
            </section>
        </div>
    )
}
