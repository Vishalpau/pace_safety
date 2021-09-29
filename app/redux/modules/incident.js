import * as actionType from '../constants/incident'

const INITIAL_STATE = {
    actionShowDataList:[],
    error:null ,
}

const IncidentReducer = (state = INITIAL_STATE,action)=>{
  
    switch(action.type){
        case actionType.ACTION_SHOW:
            return{...state, actionShowDataList:action.payload} 
        default:
            return state
    }
};

export default IncidentReducer;