import { 
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNUP_USER, 
  CLEAR_ALL  } from './types'
import firebase from 'firebase';
import {NavigationActions} from 'react-navigation';

export const clearAll = () =>{
  return {
    type: CLEAR_ALL,
    payload: null
  };
};


export const emailChanged = (text) => {
    return {
      type: EMAIL_CHANGED,
      payload: text
    };
  };


export const passwordChanged = (text) => {
    return {
      type: PASSWORD_CHANGED,
      payload: text
    };
  };

export const loginUser = ({ email, password, navigation }) => {
    return (dispatch) => {
      dispatch({ type: LOGIN_USER });
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user, navigation))
        .catch((e) => {
          
          loginUserFail(dispatch, e.message);
        });
        }
  };
  
  const loginUserFail = (dispatch, message) => {
  
    dispatch({ type: LOGIN_USER_FAIL , payload:message});
  };
  
  const loginUserSuccess = (dispatch, user, navigation) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });

    navigation.goBack()
  };

  export const signupUser = ({ email, password , navigation}) => {
    return (dispatch) => {
      dispatch({ type: SIGNUP_USER });
  
      firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => signupUserSuccess(dispatch, user, navigation))
            .catch((e) => {
               signupUserFail(dispatch, e.message)
            });

    };
  };
  
  const signupUserFail = (dispatch, message) => {
    dispatch({ type: SIGNUP_USER_FAIL,  payload:message});
  };
  
  const signupUserSuccess = (dispatch, user, navigation) => {
    dispatch({
      type: SIGNUP_USER_SUCCESS,
      payload: user
    });

    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
          NavigationActions.navigate({routeName: 'Tabs'})
      ]
    });
  
    navigation.dispatch(resetAction); // Triggered by a button press
  
  };
  
 
