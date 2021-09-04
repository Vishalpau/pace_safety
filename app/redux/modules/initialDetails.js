import * as actionType from '../constants/initialDetails'

const INITIAL_STATE = {
    projectName:{},
    error:null ,
    breakDown:[],
    userDetails:[] ,
    viewMode:{
      initialNotification:true,
      investigation:false,
      evidence:false,
      rootcauseanalysis:false,
      lessionlearn:false,
      closeout:false,
    },
    companyDataList:{},
    levelBreakDown:[]
}

const InitialDetailsReducer = (state = INITIAL_STATE,action)=>{
  
    switch(action.type){
        case actionType.PROJECT_NAME:
            return{...state, projectName:action.payload} 
        case actionType.USER_DETAILS:
          return{...state, userDetails:action.payload}
        case actionType.BREAKDOWN_DETAILS:
          return{...state, breakDown : action.payload}
        case actionType.LEVEL_BREAKDOWN_DETAILS:
          return{...state, levelBreakDown: action.payload}
        case actionType.VIEW_MODE:
          return{...state, viewMode:action.payload}
        case actionType.COMPANY_DATA:
          return{...state, companyDataList:action.payload}
        default:
            return state
    }
};

export default InitialDetailsReducer;