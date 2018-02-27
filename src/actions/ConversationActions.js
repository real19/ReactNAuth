import Realm from 'realm';
import {Conversation, ChatMessage, User, newUUID} from './../../Realmer'

import {
  CONVERSATION_UPDATE,
  CONVERSATION_CREATE,
  CONVERSATIONS_FETCH_SUCCESS,
  CONVERSATION_SAVE_SUCCESS, 
  CONVERSATION_SELECTED
} from './types';

export const conversationUpdate = ({ prop, value }) => {
  return {
    type: CONVERSATION_UPDATE,
    payload: { prop, value }
  };
};

export const conversationCreate = ({ name }) => {
  // const { currentUser } = firebase.auth();

  // console.log(`current user is ${currentUser.uid}`);

  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/conversations`)
    //   .push({ name })
    //   .then(() => {
        dispatch({ type: CONVERSATION_CREATE });
       // Actions.conversationList({ type: 'reset' });
      // });
  };
};

export const conversationsFetch = (user) => {

  console.log("Conversations fetch was called")

  return (dispatch) => {

    const config = {
      sync: {
        user: user,
        url: 'realm://localhost:9080/chat',
      },
      schema: [Conversation, ChatMessage, User]
    }
  
    const realm = new Realm(config);
    
    var conversations = realm.objects('Conversation');
    
    dispatch({ type: CONVERSATIONS_FETCH_SUCCESS, payload: conversations});

    console.log(conversations.length + ' conversations were found ');

    realm.objects('Conversation').addListener((conversations, changes) => {

      console.log('conversations listeners are noticed a change ')
    
      dispatch({ type: CONVERSATIONS_FETCH_SUCCESS, payload: conversations});
      
    });
  }
};


export const conversationSave = ({ name, uid }) => {
  // const { currentUser } = firebase.auth();

  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/conversations/${uid}`)
    //   .set({ name})
    //   .then(() => {
    //     dispatch({ type: CONVERSATION_SAVE_SUCCESS });
        
    //   });
  };
};

export const conversationDelete = ({ uid }) => {
  // const { currentUser } = firebase.auth();

  return () => {
    // firebase.database().ref(`/users/${currentUser.uid}/conversations/${uid}`)
    //   .remove()
    //   .then(() => {
    //     //Actions.conversationList({ type: 'reset' });
    //   });
  };
};

export const conversationSelected = (conversation) => {
  console.log('conversation selected action reached');

  return { type: CONVERSATION_SELECTED, payload:conversation };
};

