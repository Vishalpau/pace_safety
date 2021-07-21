import * as actionType from '../constants/initialDetails'

const INITIAL_STATE = {
  projectName: {},
  error: null,
  userDetails: []
}

const InitialDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.PROJECT_NAME:
      return { ...state, projectName: action.payload }
    case actionType.USER_DETAILS:
      return { ...state, projectName: action.payload }
    default:
      return state
  }
};

export default InitialDetailsReducer;