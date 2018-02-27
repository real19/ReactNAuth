import Realm from 'realm';
import { Conversation, ChatMessage, User, newUUID, realm } from './../../Realmer'

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

export const messageCreate = (message, selectedConversation, user, therealm) => {


  return (dispatch) => {


  const config = {
    sync: {
      user: user,
      url: 'realm://localhost:9080/chat',
    },
    schema: [Conversation, ChatMessage, User]
  }

  const realm = new Realm(config);

  let name = selectedConversation.displayName

  console.log("name is now " + name);

  let predicate = `displayName = "${selectedConversation.displayName}"`

  console.log("predicate is now " + predicate);
  console.log("message to right is now " + message);

  var conversation = realm.objects('Conversation').filtered(predicate)[0];

  try {

    let uid = newUUID();

    let now = new Date().toDateString();

    let ourUser = {
      id: user.identity,
      username: user.identity,
      displayName: user.identity,
      avatarImage: null
    }

    let chatMessage = {
      messageID: uid,
      user: ourUser,
      mimeType: 'text',
      text: message,
      extraInfo: null,
      timestamp: now,
    }

    realm.write(() => {

      conversation.chatMessages.push(chatMessage);

    
      console.log("write succeeeded")

      setTimeout(function(){ 
        
        dispatch({type:MESSAGE_CREATE})

       }, 1000);

    //  

    });


  } catch (e) {

    console.log("write failed" + e.message)
  }


  };
};

export const messagesFetch = (user, selectedConversation) => {

  return (dispatch) => {
    const config = {
      sync: {
        user: user,
        url: 'realm://localhost:9080/chat',
      },
      schema: [Conversation, ChatMessage, User]
    }

    const realm = new Realm(config);

    let name = selectedConversation.displayName

    let predicate = `displayName = "${selectedConversation.displayName}"`

    var conversation = realm.objects('Conversation').filtered(predicate)[0];

    console.log(conversation.displayName + ' conversations were thus found ');
   
    realm.objects('ChatMessage').addListener((conversations, changes) => {

      console.log('conversations listeners are noticed a change ');

  
      // 
        if (conversation){

          dispatch({ type: MESSAGES_FETCH_SUCCESS, payload: conversation.chatMessages });
        }      
      

    })
  }
};

export const messageSave = ({ name, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/messages/${uid}`)
    //   .set({ name })
    //   .then(() => {
    //     dispatch({ type: MESSAGE_SAVE_SUCCESS });

    //   });
  };
};

export const messageDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
  };
};
