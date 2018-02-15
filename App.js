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
import {RootNavigator} from './Router';
import config from './Firebase';
import firebase from 'firebase';

type Props = {};

export default class App extends Component<Props> {
  


  componentWillMount(){
   
    firebase.initializeApp(config);
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
