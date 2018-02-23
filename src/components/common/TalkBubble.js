import React from 'react';
import { Text, View } from 'react-native';


const TalkBubble  =  {
    
render(){
     
  return (
        <View style={styles.talkBubble}>
          <View style={styles.talkBubbleSquare} />
          <View style={styles.talkBubbleTriangle} />
        </View>   
      )
    }
}

const styles = {
  
  talkBubble: {
    backgroundColor: 'transparent'
  },
  talkBubbleSquare: {
    width: 120,
    height: 80,
    backgroundColor: 'red',
    borderRadius: 10
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: -26,
    top: 26,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 13,
    borderRightWidth: 26,
    borderRightColor: 'red',
    borderBottomWidth: 13,
    borderBottomColor: 'transparent'
  }
}

export  {TalkBubble};