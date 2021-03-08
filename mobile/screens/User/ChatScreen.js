import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';

export default function ChatScreen({route, navigation}) {

  const dispatch = useDispatch();
  const selfUser = useSelector((state) => state.selfUser);
  const conversations = useSelector((state) => state.conversations);
  const userId = route.params.userId;
   const messages = conversations[userId].messages;

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        renderUsernameOnMessage
        messages={messages}
        onSend={(messages) => {
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
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
