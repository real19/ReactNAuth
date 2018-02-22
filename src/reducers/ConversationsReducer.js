import {
  CONVERSATIONS_FETCH_SUCCESS, 
  CONVERSATION_SELECTED,
} from '../actions/types';

const INITIAL_STATE = {
  conversationsList: [],
  selectedConversation: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case  CONVERSATIONS_FETCH_SUCCESS:
       console.log('conversations fetched reducer reached')
       console.log(action.payload)
      return {...state, conversationsList:action.payload};
    case  CONVERSATION_SELECTED:
    console.log('conversation selected reducer reached')
      console.log(action.payload)
     return {...state, selectedConversation:action.payload};
    default:
      return state;
  }
};
