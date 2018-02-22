import React, { Component } from 'react';
import { ListView, View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Card, CardSection, Input, Spinner, Header } from './common';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { conversationUpdate, conversationCreate, conversationsFetch, emailChanged } from '../actions';
import _ from 'lodash';
import firebase from 'firebase';
import ConversationListItem from './ConversationListItem';
import Icon from 'react-native-fa-icons';
import Realm from 'realm';


class ConversationList extends Component {



  componentWillMount() {

    const user = Realm.Sync.User.current;

    if (user) {
         this.props.conversationsFetch(user);
    }else {

      this.props.navigation.navigate('LoginForm');
    }

    // else {
    //   this.props.navigation.navigate('LoginForm');
    // }

    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     // User is signed in.
    //     this.props.conversationsFetch();
    //   } else {
    //     // No user is signed in.
    //     this.props.navigation.navigate('LoginForm');
    //   }
    // });

    console.log('LIST is ');
    console.log(this.props);

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ conversationsList}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
   

    this.dataSource = ds.cloneWithRows(conversationsList);
  }



  componentDidMount() {

  }

  onButtonPress() {
    const { conversation } = this.props;

    this.props.conversationCreate({ conversation });
    this.refs.conversationsList.scrollTo({ y: this.refs.converList.height })
  }

  renderRow(conversation) {

    return <ConversationListItem conversation={conversation} />;
 
   // return (<View><Text>{conversation.displayName}</Text></View>);
  }

  render() {

    return (
      <View style={{ backgroundColor: 'white', flex: 1, alignContent: 'flex-start', }} >

      
            <ListView ref='converList'
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />
        </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

const mapStateToProps = (state) => {
  const { user } = state.auth;
  const { conversation } = state.conversationForm;
  const { conversationsList } = state.conversations;

  return { user, conversation, conversationsList };
};


export default connect(mapStateToProps, { conversationUpdate, conversationCreate, conversationsFetch })(ConversationList);
