import React, {Component} from 'react';
import { View, Text , StatusBar} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';

 class ItemList extends Component {

render(){
    
    return (<Card>
    <Text>ITEMS</Text>
    </Card>
);

}

}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
  };
  
  export default connect(mapStateToProps, null)(ItemList);
  
