
import React, { Component } from 'react';
import {
  StackNavigator, TabNavigator
} from 'react-navigation';
import LoginForm from './src/components/LoginForm';
import SignupForm from './src/components/SignupForm';
import ProfilePage from './src/components/ProfilePage';
import MessageList from './src/components/MessageList';
import ConversationList from './src/components/ConversationList';
import Icon from 'react-native-fa-icons';


export const ConversationsNavigator = StackNavigator({
  ConversationList: {
    screen: ConversationList,
    navigationOptions: {
      title: 'Channels',
    },
  },
  MessageList: { screen: MessageList },
}, {
    headerMode: 'screen',
    navigationOptions: {
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: '300',
      },
      headerStyle: {
        backgroundColor: "#444A59"
      }
    }
  });


export const Tabs = TabNavigator(
  {
    MessageList: {
      screen: ConversationsNavigator,
      navigationOptions: {
        title: 'Channels',
        tabBarLabel: 'Conversation List',
        tabBarIcon: <Icon style={{ color: '#d8d8d8', fontSize: 28 }} name='comments' />
        //)
      },
    },
    ProfilePage: {
      screen: ProfilePage, activeTintColor: 'purple',
      navigationOptions: {
        title: 'Profile Page',
        tabBarLabel: 'Profile Page',
        tabBarIcon: ({ activeTintColor }) => <Icon
          style={{ color: '#d8d8d8', fontSize: 28 }}
          name='user' />
      }
    }
  },
  {
    tabBarOptions: { activeTintColor: 'red', }
  });


export const RootNavigator = StackNavigator({
  Tabs: { screen: Tabs },
  LoginForm: { screen: LoginForm },
  SignupForm: { screen: SignupForm },
  ProfilePage: { screen: ProfilePage },
}, {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: '300',
      },
      headerStyle: {
        backgroundColor: "#444A59"
      }
    }
  });


