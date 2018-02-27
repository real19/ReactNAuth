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

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? params.otherParam : '',
    }
  };

  constructor(props){
    super(props)
    this.realmUser = Realm.Sync.User.current;

  }


  componentWillMount() {

    console.log("Component will mount was called")

    if (this.realmUser) {

      this.props.navigation.setParams({otherParam: this.props.selectedConversation.displayName})

      this.props.messagesFetch(this.realmUser, this.props.selectedConversation);
 
      this.createDataSource(this.props);
    } 

  
  }

  componentWillReceiveProps(nextProps) {

    console.log("Component will recieve props was called")

    this.createDataSource(nextProps);
  }

  createDataSource({ messageList }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(messageList);
  }



  onButtonPress() {
    const {realm,  message, selectedConversation, user } = this.props;

    this.props.messageCreate(message, selectedConversation, user, realm);
   
    
  }

  renderRow(theMessage) {

  return (<ListItem theMessage = {theMessage}  realmUser = { Realm.Sync.User.current}/>);
  }

  render() {

    return (
      <View style={{ backgroundColor: 'white', flex: 1, alignContent: 'flex-start',  }} >

<View style={{ flex: 29, marginBottom: 10,  }}>
          <ListView 
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            ref={ ( ref ) => this.scrollView = ref }
    onContentSizeChange={ () => {        
        this.scrollView.scrollToEnd( { animated: true } )
    } }
          />
        </View>
  <View style={{
          flex: 1,
          padding: 10,
          flexDirection: 'row',
          marginBottom: 10,
          alignItems: 'center',
          backgroundColor: 'transparent'
        }} >
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: '#d8d8d8',
            borderRadius: 20,
            borderWidth: 1,
          }} >
            <TextInput
             ref='chatInputMessage'
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
                  color: '#d8d8d8',
                  fontSize: 28
                }}
                  name='paper-plane' /></Text>
            </TouchableOpacity>
          </View>
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
