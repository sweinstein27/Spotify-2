import { ADD_TOKEN } from "../constants/action-types";

const initialState = {
    token: []
  };

  function rootReducer(state = initialState, action) {
    if (action.type === ADD_TOKEN) {
      return Object.assign({}, state, {
        token: state.token.concat(action.payload)
      });
    }
    return state;
  }

export default rootReducer;