import React, {Component} from 'react';
import { ListView, View, Text , StatusBar, TextInput, StyleSheet} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';
import { employeeUpdate, employeeCreate, employeesFetch } from '../actions';
import _ from 'lodash';

class MessageList extends Component {

    state = {
        dataSource: [
           {
              id: 0,
              name: 'Ben',
           },
           {
              id: 1,
              name: 'Susan',
           },
           {
              id: 2,
              name: 'Robert',
           },
           {
              id: 3,
              name: 'Mary',
           }
        ]
     }

     constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(['row 1', 'row 2', ]),
        };
      }

 componentDidMount() {
     if (!this.props.user){
        this.props.navigation.navigate('LoginForm')
     }
    
}

onButtonPress() {
    const { name } = this.props;

    this.props.employeeCreate({ name });
  }

render(){
    
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
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
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
        return { ...val, uid };
    });
  
    return { user, name, employees };
  };
  
  
  export default connect(mapStateToProps, { employeeUpdate, employeeCreate, employeesFetch  })(MessageList);
  