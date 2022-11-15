import React from 'react'
import { PlayerPreview } from './PlayerPreview'

export const PlayerList = ({ players, onRemovePlayer }) => {
  return (


    <div className='player-list'>
      {players.map(player => <PlayerPreview key={player.uid} player={player} onRemovePlayer={onRemovePlayer} />)}
    </div>

  )
}
