import {
  MESSAGE_UPDATE,
  MESSAGE_SAVE_SUCCESS,
  MESSAGE_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  message: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case MESSAGE_SAVE_SUCCESS:
      return INITIAL_STATE;
    case MESSAGE_CREATE:
      return {...state, message:''}
    default:
      return state;
  }
};
