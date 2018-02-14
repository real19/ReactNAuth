import React, {Component} from 'react';
import { View, Text , StatusBar} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';

class MessageList extends Component {

 componentDidMount() {
     if (!this.props.user){
        this.props.navigation.navigate('LoginForm')
     }
    
}

render(){
    
    return (
        <Card>
        <Text>MESSAGES</Text>
        </Card>
);

}

}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, user } = auth;
    return { email, password, error, loading, user };
  };
  
  export default connect(mapStateToProps, null)(MessageList);
  

