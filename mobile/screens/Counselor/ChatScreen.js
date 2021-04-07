import React from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Avatar} from 'react-native-elements';

export default function ChatScreen(props) {
  const dispatch = useDispatch();
  const selfUser = useSelector((state) => state.selfUser);
  var conversations = useSelector((state) => state.conversations);
  const userId = props.route.params.userId;
  var messages_main =
    conversations[userId].messages == undefined
      ? []
      : conversations[userId].messages;

  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor="#fff"
        placement="left"
        leftComponent={
          <Avatar
            rounded
            size="small"
            source={require('../../assets/doc_pr.png')}
          />
        }
        centerComponent={{
          text: 'Counselor',
          style: {color: 'black'},
        }}
        rightComponent={{icon: 'call', color: 'black'}}
      />
      <View style={{flex: 1}}>
        <GiftedChat
          renderUsernameOnMessage
          messages={messages_main}
          onSend={(messages) => {
            console.log('Messages is ' + JSON.stringify(messages_main));
            dispatch({
              type: 'private_message',
              data: {message: messages[0], conversationId: userId},
            });
            dispatch({
              type: 'server/private_message',
              data: {message: messages[0], conversationId: userId},
            });
          }}
          user={{_id: selfUser.userId}}
        />
        {Platform.OS === 'android' && (
          <KeyboardAvoidingView behavior="padding" />
        )}
      </View>
    </View>
  );
}
