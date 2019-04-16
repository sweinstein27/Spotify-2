import { ADD_TOKEN } from "../constants/action-types";

const initialState = {
    tokens: []
  };

  function rootReducer(state = initialState, action) {
    if (action.type === ADD_TOKEN) {
      return Object.assign({}, state, {
        tokens: state.tokens.concat(action.payload)
      });
    }
    return state;
  }

export default rootReducer;