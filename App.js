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
import {RootNavigator, Tabs} from './Router';
import Realm from 'realm';
import {Conversation, ChatMessage, User} from './Realmer'

type Props = {};

export default class App extends Component<Props> {
  
  componentWillMount(){

  }


  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
    <Provider store ={store}>
        <RootNavigator/>
      </Provider>
    );
  }
}
