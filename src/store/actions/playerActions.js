import { playerService } from "../../services/playerService"


export function loadPlayers() {

    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().playerModule
            const players = await playerService.getPlayers(filterBy)
            dispatch({ type: 'SET_PLAYERS', players })
        } catch (err) {
            console.log(`return ~ err`, err)
        }
    }

}

export function removePlayer(playerId) {

    return async (dispatch) => {
        try {
            const players = await playerService.deletePlayer(playerId)
            dispatch({ type: 'REMOVE_PLAYER', playerId })
        } catch (err) {
            console.log(`return ~ err`, err)
        }
    }

}
export function setFilterBy(filterBy) {

    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }

}