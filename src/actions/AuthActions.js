import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNUP_USER,
  CLEAR_ALL,  
  REALM_SUCCESS
} from './types'
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import Realm from 'realm';
import { Conversation, ChatMessage, User , newUUID} from '../../Realmer'

export const clearAll = () => {
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

    Realm.Sync.User.login('http://0.0.0.0:9080', email, password).then(user => {

      createSchema(dispatch, user);

      loginUserSuccess(dispatch, user, navigation);
      // user is logged in
      // do stuff ...
    }).catch(error => {
      // an auth error has occurred
      loginUserFail(dispatch, error.message);
    });

    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(user => loginUserSuccess(dispatch, user, navigation))
    //   .catch((e) => {

    //     loginUserFail(dispatch, e.message);
    //   });
  }
};

const loginUserFail = (dispatch, message) => {

  dispatch({ type: LOGIN_USER_FAIL, payload: message });
};

const loginUserSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });


  navigation.goBack();
};



const createConversation = (realm, user, theDisplayName) => {

    // user is logged in
  // do stuff ...              // This is a Results object, which will live-update.
  var realmChannels = realm.objects('Conversation').filtered(`displayName = '${theDisplayName}'`) ;

  if (realmChannels.length < 1) {

    let uid = newUUID();

    console.log("newUUID is " + newUUID)

    let theUser = {
      id: user.identity,
      username: user.identity,
      displayName: user.identity,
      avatarImage: null
    }

    try {
      realm.write(() => {
        let channel = realm.create('Conversation',
          {
            conversationId: uid,
            displayName: theDisplayName,
            unreadCount: 0,
            chatMessages: [],
            users: [theUser],
          }
        );

        console.log("Conversation created!!!")
      });

    } catch (error) {
      console.log("Error on creation");
      console.log(error);
    }
  }


}

const createSchema = (dispatch, user) => {

  const realm = new Realm({
    sync: {
      user: user,
      url: 'realm://localhost:9080/chat',
    },
    schema: [Conversation, ChatMessage, User]
  });

 
  // createConversation(realm, user, 'General');
  // createConversation(realm, user, 'Events');

  dispatch({
    type: REALM_SUCCESS,
    payload: realm
  });

}

export const signupUser = ({ email, password, navigation }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });

    Realm.Sync.User.register('http://0.0.0.0:9080', email, password, (error, user) => {

      if (user) {

        signupUserSuccess(dispatch, user, navigation);

      } else if (error) {

        signupUserFail(dispatch, error.message);
      }


    });

    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //       .then(user => signupUserSuccess(dispatch, user, navigation))
    //       .catch((e) => {
    //          signupUserFail(dispatch, e.message)
    //       });

  };
};

const signupUserFail = (dispatch, message) => {
  dispatch({ type: SIGNUP_USER_FAIL, payload: message });
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
      NavigationActions.navigate({ routeName: 'Tabs' })
    ]
  });

  navigation.dispatch(resetAction); // Triggered by a button press

};


