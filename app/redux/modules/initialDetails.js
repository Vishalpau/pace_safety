import * as actionType from '../constants/initialDetails'

const INITIAL_STATE = {
    projectName:{},
    error:null ,
    breakDown:[],
    userDetails:[] 
}

const InitialDetailsReducer = (state = INITIAL_STATE,action)=>{
  
    switch(action.type){
        case actionType.PROJECT_NAME:
            return{...state, projectName:action.payload} 
        case actionType.USER_DETAILS:
          return{...state, userDetails:action.payload}
        case actionType.BREAKDOWN_DETAILS:
          return{...state, breakDown : action.payload}
        case actionType.ADD_BREAKDOWN_DETAILS:
          return{...state, breakDown: state.breakDown.concat(action.payload)  }
        default:
            return state
    }
};

export default InitialDetailsReducer;