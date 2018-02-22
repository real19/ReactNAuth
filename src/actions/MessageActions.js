import Realm from 'realm';
import firebase from 'firebase';
import {Conversation, ChatMessage, User} from './../../Realmer'

import {
  MESSAGE_UPDATE,
  MESSAGE_CREATE,
  MESSAGES_FETCH_SUCCESS,
  MESSAGE_SAVE_SUCCESS
} from './types';

export const messageUpdate = ({ prop, value }) => {
  return {
    type: MESSAGE_UPDATE,
    payload: { prop, value }
  };
};

export const messageCreate = ({ message }) => {
  const { currentUser } = firebase.auth();

  console.log(`current user is ${currentUser.uid}`);

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/messages`)
      .push({ message })
      .then(() => {
        dispatch({ type: MESSAGE_CREATE });
       // Actions.messageList({ type: 'reset' });
      });
  };
};

export const messagesFetch = () => {
  

  return (dispatch) => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/messages`)
      .on('value', snapshot => {
        dispatch({ type: MESSAGES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const messageSave = ({ name, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/messages/${uid}`)
      .set({ name})
      .then(() => {
        dispatch({ type: MESSAGE_SAVE_SUCCESS });
        
      });
  };
};

export const messageDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/messages/${uid}`)
      .remove()
      .then(() => {
        //Actions.messageList({ type: 'reset' });
      });
  };
};
