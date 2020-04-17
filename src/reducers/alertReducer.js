import {
    SHOW_ALERT,
    CLOSE_ALERT
} from '../types'

//each reducer has an state
const initialState = {
    alert: null
}

export default function(state=initialState, action) {
    switch(action.type) {
        case SHOW_ALERT:
            return{
                ...state,
                alert: action.payload
            }
        case CLOSE_ALERT:
            return{
                ...state,
                alert: null
            }
        default:
            return state
    }
}