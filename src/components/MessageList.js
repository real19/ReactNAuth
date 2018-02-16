import React, { Component } from 'react';
import { ListView, View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Card, CardSection, Input, Spinner, Header } from './common';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate, employeesFetch, emailChanged } from '../actions';
import _ from 'lodash';
import firebase from 'firebase';
import ListItem from './ListItem';
import Icon from 'react-native-fa-icons';


class MessageList extends Component {



  componentWillMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.props.employeesFetch();
      } else {
        // No user is signed in.
        this.props.navigation.navigate('LoginForm');
      }
    });



    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees.reverse());
  }



  componentDidMount() {

  }

  onButtonPress() {
    const { name } = this.props;

    this.props.employeeCreate({ name });
    this.refs.chatList.scrollTo({ y: this.refs.chatList.height })
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
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
              value={this.props.name}
              onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })} />

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
                  name='sign-out' /></Text>
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
  const { user } = state.auth;
  const { name } = state.employeeForm;
  const employees = _.map(state.employees, (val, uid) => {

    let employeeArray = { ...val, uid }
    console.log(employeeArray);
    return employeeArray;
  });

  return { user, name, employees };
};


export default connect(mapStateToProps, { employeeUpdate, employeeCreate, employeesFetch })(MessageList);
