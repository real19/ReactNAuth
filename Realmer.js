

import Realm from 'realm';

export function getRealm(user){

    const config = {
      sync: {
        user: this.props.user,
        url: 'realm://localhost:9080/chat',
      },
      schema: [Conversation, ChatMessage, User]
    }

    return  realm = new Realm(config);
  }

export class User extends Realm.Object {}
User.schema = {
    name: 'User',
    properties: {
        id:'string',
        username: 'string',
        displayName:'string',
        avatarImage:'data?',
    },
};


export class ChatMessage extends Realm.Object {}
ChatMessage.schema = {
    name: 'ChatMessage',
    properties: {
        messageID:'string',
        user:'User?',
        mimeType:'string',
        text: 'string',
        extraInfo:'data?',
        timestamp:'date',
        conversations:{type: 'linkingObjects', objectType: 'Conversation', property: 'chatMessages'}
    },
};

export const newUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


export class Conversation extends Realm.Object {}
Conversation.schema = {
    name: 'Conversation',
    properties: {
        conversationId:'string',
        displayName: 'string',
        unreadCount:'int',
        chatMessages:'ChatMessage[]',
        users:'User[]',

    },
};


