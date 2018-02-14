/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';

import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';
import SignupForm from './src/components/SignupForm';
import ItemList from './src/components/ItemList';
import MessageList from './src/components/MessageList';

import FontAwesome, { Icons } from 'react-native-fontawesome';

import {
  StackNavigator, TabNavigator
} from 'react-navigation';



type Props = {};
export default class App extends Component<Props> {
  

  
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyDcK-W7YkhkipntN5CRQxrp_QzV4yASXmo",
      authDomain: "ourauthredux.firebaseapp.com",
      databaseURL: "https://ourauthredux.firebaseio.com",
      projectId: "ourauthredux",
      storageBucket: "ourauthredux.appspot.com",
      messagingSenderId: "626938938428",
      persistence: true,
    };
    firebase.initializeApp(config);
  }


  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))


  const Tabs = TabNavigator({

    MessageList: {
      screen: MessageList,
      navigationOptions: {
        tabBarLabel:'',
        tabBarIcon: <FontAwesome style={{fontSize: 22}}>{Icons.listUl}</FontAwesome>
        //)
      },
    },
      Feed: {
        screen: ItemList,
        navigationOptions: {
          tabBarLabel:'',
        tabBarIcon: <FontAwesome style={{fontSize: 22}}>{Icons.bullseye}</FontAwesome>
        },
      },
    });
   

  const RootNavigator = StackNavigator({
    Tabs: { screen: Tabs },
    LoginForm: { screen: LoginForm },
    SignupForm: { screen: SignupForm },
    ItemList: { screen: ItemList },
  },{
    mode: 'modal',
    headerMode: 'screen',
    navigationOptions:{
      headerTintColor: "white",
        headerTitleStyle: {
            fontWeight: '300',
          },
        headerStyle: {
         backgroundColor:"#444A59"
       }
    }
  });


    return (
    <Provider store ={store}>
        <RootNavigator/>
      </Provider>
    );
  }
}
