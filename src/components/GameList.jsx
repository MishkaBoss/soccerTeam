import React from 'react'
import { GamePreview } from './GamePreview'

export const GameList = ({ games, name }) => {
    return (
        <div className='md:grid grid-cols-2 gap-1'>
            {games.map(game => <GamePreview game={game} key={game.gameId} name={name} />)}
        </div>
    )
}
