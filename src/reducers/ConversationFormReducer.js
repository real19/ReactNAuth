import {
  CONVERSATION_UPDATE,
  CONVERSATION_CREATE,
  CONVERSATION_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONVERSATION_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CONVERSATION_CREATE:
      return INITIAL_STATE;
    case CONVERSATION_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
