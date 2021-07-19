import * as initial_details from "../constants/initialDetails"
const initialState = {
  usersLogin: Map({
    email: 'johndoe@mail.com',
    password: '12345678',
    remember: false
  })
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case INIT:
      return state;
    default:
      return state;
  }
}