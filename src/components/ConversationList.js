import React, { Component } from 'react';
import { 
  ListView, 
  View, 
  Text, 
  StatusBar, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  TouchableWithoutFeedback 
} from 'react-native';
import { Card, CardSection, Input, Spinner, Header } from './common';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { conversationUpdate, 
  conversationCreate, 
  conversationsFetch, 
  loginUserSuccess, 
  conversationSelected} from '../actions';
import ConversationListItem from './ConversationListItem';
import Icon from 'react-native-fa-icons';
import Realm from 'realm';


class ConversationList extends Component {


  componentWillMount() {


    const user = Realm.Sync.User.current;

    if (user) {
      
      this.props.loginUserSuccess(user, this.props.navigation);
      this.props.conversationsFetch(user);



    }else {

      this.props.navigation.navigate('LoginForm');
    }

  //  console.log('LIST is ');
   // console.log(this.props);

    this.createDataSource(this.props);
  }
  

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    console.log('ConversationsList view is recieving some new props')

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



  renderRow(conversation) {
     return <ConversationListItem conversation={conversation} navigation = {this.props.navigation} />;
  }

  render() {

    return (
      <View style={{ backgroundColor: 'white', flex: 1, alignContent: 'flex-start', }} >

            <ListView ref='converList'
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow.bind(this)}
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
  const { selectedConversation, conversationsList } = state.conversations;

  return { user, selectedConversation, conversationsList };
};


export default connect(mapStateToProps, { loginUserSuccess, conversationUpdate, conversationCreate, conversationsFetch, conversationSelected })(ConversationList);
