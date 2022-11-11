import React from 'react'
import {PlayerPreview} from './PlayerPreview'

export const PlayerList = ({players}) => {
  return (
    
    
        <div className='player-list'>
          {players.map(player => <PlayerPreview key={player._id} player={player}/> )}
        </div>
    
  )
}
