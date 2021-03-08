import {useLinkProps} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';

export default function ChatScreen({route, navigation}) {
 // const [messages, setMessages] = useState([]);

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

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   }, []);

//   return (
//     <View style={{flex: 1}}>
//       <GiftedChat
//         renderUsernameOnMessage
//         messages={messages}
//         onSend={(messages) => onSend(messages)}
//         user={{
//           _id: 1,
//         }}
//       />
//       {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
//     </View>
//   );
// }
