import {
    SHOW_ALERT,
    CLOSE_ALERT
} from '../types'

//show alert

export function showAlert(alert){
    return(dispatch)=>{
        dispatch(createAlert(alert))
    }
}

const createAlert = alert =>({
    type: SHOW_ALERT,
    payload: alert
})

//close alert

export function closeAlertAction(){
    return(dispatch) => {
        dispatch(closeAlert())
    }
}
const closeAlert = () =>({
    type: CLOSE_ALERT
})