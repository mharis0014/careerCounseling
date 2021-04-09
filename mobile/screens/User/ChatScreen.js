import React from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Avatar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChatScreen = (props) => {
  const dispatch = useDispatch();
  const selfUser = useSelector((state) => state.selfUser);
  var conversations = useSelector((state) => state.conversations);
  const userId = props.route.params.userId;
  const name = props.route.params.name;
  const img = props.route.params.img;
  var messages_main =
    conversations[userId].messages == undefined
      ? []
      : conversations[userId].messages;

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Header
          backgroundColor="#FF6161"
          placement="left"
          leftComponent={
            <Avatar
              rounded
              size="small"
              source={{
                uri: `data:image/jpg;base64,${img}`,
              }}
            />
          }
          centerComponent={{
            text: name,
            style: {color: 'black', paddingTop: 6},
          }}
          rightComponent={{icon: 'videocam', color: 'black'}}
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
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
          />
          {Platform.OS === 'android' && (
            <KeyboardAvoidingView behavior="padding" />
          )}
        </View>
      </View>
    </>
  );
};

export default ChatScreen;