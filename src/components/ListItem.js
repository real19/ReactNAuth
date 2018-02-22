import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { CardSection } from './common';

class ListItem extends Component {
  onRowPress() {
   // Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { message } = this.props.messages;

    return (
      <TouchableWithoutFeedback 
        onPress={this.onRowPress.bind(this)}>
        <View style={{backgroundColor:'#0072C6', 
        flex: 1, 
         margin:10,
          borderRadius:10 }}>
        <View>
            <Text style={styles.titleStyle}>
              {message}
            </Text>
            </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 14,
    padding: 10,
    color:'white',
    flex:1
  }
};

export default ListItem;
