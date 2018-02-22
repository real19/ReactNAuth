import {
  MESSAGE_UPDATE,
  MESSAGE_CREATE,
  MESSAGE_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case MESSAGE_CREATE:
      return INITIAL_STATE;
    case MESSAGE_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};