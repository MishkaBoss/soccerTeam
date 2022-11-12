import { PlayerList } from '../components/PlayerList'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadPlayers, removePlayer } from '../store/actions/playerActions.js'

export const SoccerTeamApp = (props) => {
  const { players } = useSelector(state => state.playerModule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPlayers())
    // console.log(players);
    return () => {

    }
  }, [])

  const onRemovePlayer = async (playerId) => {

    await dispatch(removePlayer(playerId))
  }

  if (!players) return <div>Loading... </div>
  return (
    <div className="soccer-team-app" >

      <PlayerList onRemovePlayer={onRemovePlayer} players={players} />
    </div>
  )
}