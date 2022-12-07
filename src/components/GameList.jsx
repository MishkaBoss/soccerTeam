import React from 'react'
import { GamePreview } from './GamePreview'

export const GameList = ({ games, name }) => {
    return (
        <div>
            {games.map(game => <GamePreview game={game} key={game.gameId} name={name} />)}
        </div>
    )
}
