import React from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Avatar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ChatScreen(props) {
  const dispatch = useDispatch();
  const selfUser = useSelector((state) => state.selfUser);
  var conversations = useSelector((state) => state.conversations);
  const userId = props.route.params.userId;
  const username = props.route.params.name;
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
    <View style={{flex: 1}}>
      <Header
        backgroundColor="#3c4852"
        placement="left"
        leftComponent={
          <Avatar
            rounded
            size="small"
            source={require('../../assets/user.png')}
          />
        }
        centerComponent={{
          text: username,
          style: {color: '#fff', paddingTop: 6},
        }}
        rightComponent={{icon: 'videocam', color: '#fff'}}
        onTouchEnd={() => {
          console.log('Consoler type is ' + props.route.params.type);

          if (props.route.params.type === 'counsoler') {
            fetch('http://10.0.2.2:3000/getallusers_videoid')
              .then((res) => res.json())
              .then((resJson) => {
                console.log(
                  'Get all users is ' + props.route.params.name.substr(2),
                );
                for (var i = 0; i < resJson.length; ++i) {
                  if (resJson[i].email == props.route.params.name.substr(2)) {
                    global.sessionid = '' + resJson[i].sessionId;
                    global.tokenid = '' + resJson[i].tokenid;
                  }
                }
                console.log('Session id is ' + global.sessionid);
                props.navigation.navigate('Videochat');
              })
              .catch((e) => console.log(e));
          } else {
            console.log('Session id is ' + global.sessionid);
            props.navigation.navigate('Videochat');
          }
        }}
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
  );
}
