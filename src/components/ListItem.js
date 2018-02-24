import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { CardSection } from './common';

class ListItem extends Component {
  onRowPress() {
   // Actions.employeeEdit({ employee: this.props.employee });
  }

  renderBackgroundColor(){
  
    if (this.userIsSame()) {
      return '#0072C6'
    } else {
      return '#d8d8d8'
    }
  }

  renderTextColor(){
  
    if (this.userIsSame()) {
      return 'white'
    } else {
      return 'black'
    }
  }

  renderJustification(){
  
    if (this.userIsSame()) {
      return 'flex-end'
    } else {
      return 'flex-start'
    }

  }

  userIsSame(){

    const {message, realmUser} = this.props;

    if (realmUser.identity === message.user.id) {
      return true
    } else {
      return false
    }

  }


  render() {
    const { message, realmUser } = this.props;

    let alignment =  this.renderJustification()
    let backgroundColor = this.renderBackgroundColor()
    let textColor = this.renderTextColor()

    return (<View  style={{justifyContent:alignment, flexDirection:'row',
    alignContent:'center',}}>
      <TouchableWithoutFeedback
        onPress={this.onRowPress.bind(this)}>
        <View style={{backgroundColor:backgroundColor, 
        maxWidth: '80%', 
        alignSelf: 'flex-start',
        paddingLeft:5,
        paddingRight:5,
         margin:10,
          borderRadius:20 }}>
            <Text style={{
                          fontSize: 14,
                          padding: 10,
                          color:textColor,
                          flex:1
                        }}>
              {message.text}
            </Text>
        </View>
      </TouchableWithoutFeedback>
      </View>
    );
  }
}


export default ListItem;
