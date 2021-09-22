import * as actionType from '../constants/authentication'

const INITIAL_STATE = {
    permissionList:[],
    error:null ,
}

const AuthReducer = (state = INITIAL_STATE,action)=>{
  
    switch(action.type){
        case actionType.PERMISSION_DETAILS:
            return{...state, permissionList:action.payload} 
        default:
            return state
    }
};

export default AuthReducer;