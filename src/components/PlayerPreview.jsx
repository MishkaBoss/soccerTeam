import React from 'react'

export const PlayerPreview = ({ user, onRemovePlayer }) => {
  return (
    <div>
      <div>
        <p>{user.name}</p>
        <button onClick={() => onRemovePlayer(user.uid)}>Remove</button>
      </div>
    </div >
  )
}
