import Realm from 'realm';
import firebase from 'firebase';
import { Conversation, ChatMessage, User, newUUID } from './../../Realmer'

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

export const messageCreate = (message, selectedConversation, user) => {

  console.log("user is " + user)

  return (dispatch) => {



  const config = {
    sync: {
      user: user,
      url: 'realm://localhost:9080/chat',
    },
    schema: [Conversation, ChatMessage, User]
  }

  const realm = new Realm(config);


    var conversation = realm.objects('Conversation').filtered(`displayName = '${selectedConversation.displayName}'`);

    if (conversation.length < 1) {

      try {

        let uid = newUUID();
        let now = new Date().toDateString();


        console.log("newUUID is " + newUUID)

        let chatMessage = {
          messageID: uid,
          user: user,
          mimeType:'text',
          text: 'string',
          extraInfo:null,
          timestamp:now,
          conversations:[]
        }

        realm.write(() => {

          conversation.chatMessages.push(chatMessage);

        });


      } catch (e) {

        console.log("write failed :(")
      }
    }
  };
};

export const messagesFetch = () => {


  return (dispatch) => {
    //   const { currentUser } = firebase.auth();

    //   firebase.database().ref(`/users/${currentUser.uid}/messages`)
    //     .on('value', snapshot => {
    //       dispatch({ type: MESSAGES_FETCH_SUCCESS, payload: snapshot.val() });
    //     });
  };
};

export const messageSave = ({ name, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/messages/${uid}`)
      .set({ name })
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
