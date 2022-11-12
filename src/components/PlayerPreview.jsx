import React from 'react'

export const PlayerPreview = ({ player, onRemovePlayer }) => {
  return (
    <div>
      <div>
        <p>{player.name}</p>
        <button onClick={() => onRemovePlayer(player._id)}>Remove</button>
      </div>
    </div >
  )
}
