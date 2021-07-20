import * as actionsType from '../constants/initialDetails'

export const initialDetails = user => {
    return {
        type: actionsType.USER,
        payload: user
    }
}

export const projectName = data=>{
    return {
        type: actionsType.PROJECT_NAME,
        payload: data
    }
}