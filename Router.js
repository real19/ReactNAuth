
import React, { Component } from 'react';
import {
    StackNavigator, TabNavigator
  } from 'react-navigation';
import LoginForm from './src/components/LoginForm';
import SignupForm from './src/components/SignupForm';
import ItemList from './src/components/ItemList';
import MessageList from './src/components/MessageList';
import Icon from 'react-native-fa-icons';


export  const Tabs = TabNavigator(
    
    {
      MessageList: {
      screen: MessageList,
      navigationOptions: {
        tabBarLabel:'Message List',
        tabBarIcon: <Icon style= {{color:'red', fontSize:28}} name='comments' />
        //)
      },
    },
      Feed: {
        screen: ItemList,activeTintColor:'purple',
        navigationOptions: {
          tabBarLabel:'Item List',
          tabBarIcon: ({activeTintColor}) =>  <Icon style= {{color:'green', fontSize:28}} name='assistive-listening-systems' />
        }
      }
    },
     {
      tabBarOptions: { activeTintColor:'purple', }
    });
   

export const RootNavigator = StackNavigator({
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


