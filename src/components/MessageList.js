import React, { Component } from 'react';
import { ListView, View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Card, CardSection, Input, Spinner, Header } from './common';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { messageUpdate, messageCreate, messagesFetch } from '../actions';

import ListItem from './ListItem';
import Icon from 'react-native-fa-icons';
import Realm from 'realm';


class MessageList extends Component {

  // static navigationOptions = {
  //   title:  'Messages',
  // };


  componentWillMount() {

   const user = Realm.Sync.User.current;

    if (user) {

      this.props.messagesFetch(user, this.props.selectedConversation);

    } else {
      // this.props.navigation.navigate('LoginForm');
    }

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {

    this.createDataSource(nextProps);
  }

  createDataSource({ messageList }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(messageList);
  }



  componentDidMount() {

  }

  onButtonPress() {
    const {realm,  message, selectedConversation, user } = this.props;

    this.props.messageCreate(message, selectedConversation, user, realm);
    
    this.refs.chatList.scrollTo({ y: this.refs.chatList.height })
  }

  renderRow(theMessage) {
    return <ListItem message = {theMessage} />;
  }

  render() {

    return (
      <View style={{ backgroundColor: 'white', flex: 1, alignContent: 'flex-start',  }} >

  <View style={{
          flex: 1,
          padding: 10,
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
          backgroundColor: 'transparent'
        }} >
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'lightgray',
            borderRadius: 20,
            borderWidth: 1,
          }} >
            <TextInput
              style={{
                flex: 8,
                margin: 2,
                padding: 10,
                height: 44
              }}
              placeholder="Whats on your mind ..."
              value={this.props.message}
              onChangeText={value => this.props.messageUpdate({ prop: 'message', value })} />

            <TouchableOpacity style={{
              flex: 1,
              padding: 10,
              backgroundColor: 'transparent',
              borderRadius: 10
            }} onPress={this.onButtonPress.bind(this)}>
              <Text style={{ color: 'white' }}>
                <Icon style={{
                  color: 'gray',
                  fontSize: 28
                }}
                  name='fighter-jet' /></Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 29, marginBottom: 10,  }}>
          <ListView ref='chatList'
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </View>

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
  const { realm, user } = state.auth;
  const { message } = state.messageForm;
  const { selectedConversation } = state.conversations;
  const {messageList} = state.messages;

  return {realm, user, message, messageList, selectedConversation };
};


export default connect(mapStateToProps, { messageUpdate, messageCreate, messagesFetch })(MessageList);
