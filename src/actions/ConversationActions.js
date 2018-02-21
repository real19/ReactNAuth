import Realm from 'realm';
import firebase from 'firebase';
import {Conversation, ChatMessage, User, newUUID} from './../../Realmer'

import {
  CONVERSATION_UPDATE,
  CONVERSATION_CREATE,
  CONVERSATION_FETCH_SUCCESS,
  CONVERSATION_SAVE_SUCCESS
} from './types';

export const conversationUpdate = ({ prop, value }) => {
  return {
    type: CONVERSATION_UPDATE,
    payload: { prop, value }
  };
};

export const conversationCreate = ({ name }) => {
  const { currentUser } = firebase.auth();

  console.log(`current user is ${currentUser.uid}`);

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/conversations`)
      .push({ name })
      .then(() => {
        dispatch({ type: CONVERSATION_CREATE });
       // Actions.conversationList({ type: 'reset' });
      });
  };
};

export const conversationsFetch = () => {
  

  return (dispatch) => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/conversations`)
      .on('value', snapshot => {
        dispatch({ type: CONVERSATION_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const conversationSave = ({ name, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/conversations/${uid}`)
      .set({ name})
      .then(() => {
        dispatch({ type: CONVERSATION_SAVE_SUCCESS });
        
      });
  };
};

export const conversationDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/conversations/${uid}`)
      .remove()
      .then(() => {
        //Actions.conversationList({ type: 'reset' });
      });
  };
};
