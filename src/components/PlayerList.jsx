import React from 'react'
import { PlayerPreview } from './PlayerPreview'

export const PlayerList = ({ users, onRemovePlayer }) => {
  return (


    <div className='player-list'>
      {users.map(user => <PlayerPreview key={user.uid} user={user} onRemovePlayer={onRemovePlayer} />)}
    </div>

  )
}
