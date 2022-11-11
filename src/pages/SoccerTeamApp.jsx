import {PlayerList} from '../components/PlayerList'
import {connect, useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {loadPlayers} from '../store/actions/playerActions.js'

export const SoccerTeamApp = (props) => {
    const { players } = useSelector(state => state.playerModule)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(loadPlayers())
    // console.log(players);
      return () => {
        
      }
    },[])
    

    // const backgroundStyling = { backgroundImage: 'url(src/assets/scss/images/bg_image.jpeg)' }
    if (!players) return <div>Loading... </div>
    return (
        <div className="soccer-team-app" >
            
            <PlayerList players={players}/>
        </div>
    )
}