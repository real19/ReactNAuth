import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { conversationSelected } from '../actions';

class ConversationListItem extends Component {
  onRowPress() {
    const { conversation, conversationSelected } = this.props;
    console.log('Button pressed for' + conversation.displayName);

     conversationSelected(conversation);

    this.props.navigation.navigate('MessageList');
  }

  render() {
    const { conversation } = this.props;

    return (
      <TouchableWithoutFeedback 
        onPress={this.onRowPress.bind(this)}>
        <View style={{backgroundColor:'#B8312F', 
        flex: 1,
        padding:10, 
         margin:1, }}>
        <View>
            <Text style={styles.titleStyle}>
              {conversation.displayName}
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
    padding: 5,
    color:'white',
    flex:1,
    textAlign:'center'
  }
};


export default connect(null, {conversationSelected})(ConversationListItem);

