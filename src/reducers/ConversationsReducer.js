import {
  CONVERSATIONS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  conversationsList: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case  CONVERSATIONS_FETCH_SUCCESS:
       console.log('hello world')
       console.log(action.payload)
      return {...state, conversationsList:action.payload};
    default:
      return state;
  }
};
