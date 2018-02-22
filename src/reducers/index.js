import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MessageFormReducer from './MessageFormReducer';
import MessageReducer from './MessageReducer';
import ConversationsReducer from './ConversationsReducer';

export default combineReducers({
  auth: AuthReducer,
  messageForm: MessageFormReducer,
  messages: MessageReducer,
  conversations:ConversationsReducer,
});
