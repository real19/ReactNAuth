import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import MessageReducer from './MessageReducer';
import ConversationsReducer from './ConversationsReducer';

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  messages: MessageReducer,
  conversations:ConversationsReducer,
});
