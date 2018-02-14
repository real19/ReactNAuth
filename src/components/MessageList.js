import React, {Component} from 'react';
import { ListView, View, Text , StatusBar, TextInput, StyleSheet} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';

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

render(){
    
    return (
        <View>
    <CardSection>
    <Text>Messages</Text>
        
    </CardSection>

<Card>
<TextInput label="Add New Item" placeholder="Add New Item" />

</Card>

<CardSection>
<Button>Send</Button>
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
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
      },
  });

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, user } = auth;
    return { email, password, error, loading, user };
  };
  
  export default connect(mapStateToProps, null)(MessageList);
  

