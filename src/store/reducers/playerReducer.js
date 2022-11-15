
const INITIAL_STATE = {
    players: null,
    filterBy: null
}


// action = {type: SET_PLAYERS, players: [...]}
export function playerReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_PLAYERS':
            return {
                ...state,
                players: action.players
            }

        case 'ADD_PLAYER':
            return {
                ...state,
                players: [...state.players, action.player]
            }

        case 'REMOVE_PLAYER':
            return {
                ...state,
                players: state.players.filter(player => player.uid !== action.playerId)
            }

        case 'UPDATE_PLAYER':
            return {
                ...state,
                players: state.players.map(player => player.uid === action.player.uid ? action.player : player)
            }

        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }





        default:
            return state;
    }
}