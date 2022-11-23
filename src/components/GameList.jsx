import React from 'react'
import { GamePreview } from './GamePreview'

export const GameList = ({ games }) => {
    return (
        <div>
            {games.map(game => <GamePreview game={game} key={game.gameId} />)}
        </div>
    )
}
