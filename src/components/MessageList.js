import React, { Component } from 'react';
import { ListView, View, Text, StatusBar, TextInput, StyleSheet } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate, employeesFetch, emailChanged } from '../actions';
import _ from 'lodash';
import firebase from 'firebase';
import ListItem from './ListItem';

class MessageList extends Component {

  componentWillMount() {
 
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
        // User is signed in.
        this.props.employeesFetch();
      } else {
        // No user is signed in.
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

    this.dataSource = ds.cloneWithRows(employees);
  }

  

  componentDidMount() {

   

    if (!this.props.user) {
      this.props.navigation.navigate('LoginForm')
    }

  }

  onButtonPress() {
    const { name } = this.props;

    this.props.employeeCreate({ name });
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {

    return (
      <View>
        <CardSection>
          <Text>Messages</Text>

        </CardSection>

        <Card>
          <TextInput label="Add New Item"
            placeholder="Add New Item"
            value={this.props.name}
            onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })} />

        </Card>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Add</Button>
        </CardSection>
        <Card>
        <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
        </Card>
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

    let employeeArray =  { ...val, uid }
    console.log(employeeArray);
    return employeeArray;
  });

  return { user, name, employees };
};


export default connect(mapStateToProps, { employeeUpdate, employeeCreate, employeesFetch })(MessageList);
