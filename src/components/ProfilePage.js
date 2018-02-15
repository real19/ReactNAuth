import React, {Component} from 'react';
import { View, Text , StatusBar, TextInput, Form, TouchableOpacity} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';
import firebase from 'firebase';
import Icon from 'react-native-fa-icons';


 class ProfilePage extends Component {

    onLoginButtonPress(){
        firebase.auth().signOut();
    }


render(){
    
    return (
    <View style={{backgroundColor:'white', flex:1}}>
        <CardSection>
    <Card>
    <TouchableOpacity onPress={this.onLoginButtonPress.bind(this)}>
        <Text><Icon style= {{color:'gray', fontSize:28}} name='sign-out' />  Logout</Text>

        
        
      </TouchableOpacity>
    </Card>
    </CardSection>
</View>
);

}

}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
  };
  
  export default connect(mapStateToProps, null)(ProfilePage);
  
