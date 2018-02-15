import React, {Component} from 'react';
import { View, Text , StatusBar, TextInput, Form} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';
 class ItemList extends Component {

render(){
    
    return (
    <View>
    <Card>
    <Text>ITEMS</Text>
    </Card>
</View>
);

}

}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
  };
  
  export default connect(mapStateToProps, null)(ItemList);
  
