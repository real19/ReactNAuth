import React, { Component } from 'react';
import { View, Text, StatusBar, TextInput, Form, TouchableOpacity } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Icon from 'react-native-fa-icons';
import Realm from 'realm';

class ProfilePage extends Component {

    onLoginButtonPress() {
        Realm.Sync.User.current.logout();
        this.props.navigation.navigate('LoginForm');
    }


    render() {

        return (
            <View style={{
                backgroundColor: 'white',
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center'
            }} >
                <CardSection style={{
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                    <Card style={{
                    backgroundColor: 'blue',}}>
                        <TouchableOpacity onPress={this.onLoginButtonPress.bind(this)}>
                            <Text><Icon style={{ color: '#d8d8d8', fontSize: 28 }} name='sign-out' />  Logout</Text>
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