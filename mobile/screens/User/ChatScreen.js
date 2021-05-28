import React, {useEffect} from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Avatar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'react-native-elements';

const ChatScreen = (props) => {
  const counselorId = props.route.params.counselorId;
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after 30 second!');
      props.navigation.navigate('Ratings Screen', {id: counselorId});
    }, 30000);
    return () => clearTimeout(timer);
  }, []);
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
  if (messages_main.length != 0) {
    var message_new = messages_main[messages_main.length - 1].text;
    console.log('Last Message is ' + message_new);
  }
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
              onPress={() => props.navigation.navigate('Ratings Screen')}
            />
          }
          centerComponent={{
            text: name,
            style: {color: 'black', paddingTop: 6},
          }}
          rightComponent={
            <>
              <Icon
                style={{marginLeft: 15, color: '#fff'}}
                name={'videocam'}
                size={25}
                color={'white'}
                onPress={() => {
                  var message = {
                    text: 'Video Chat Started',
                    user: {_id: global.user_chatid2},
                    createdAt: new Date('2021-05-12T08:15:39.869Z'),
                    _id: userId,
                  };
                  dispatch({
                    type: 'private_message',
                    data: {message: message, conversationId: userId},
                  });
                  dispatch({
                    type: 'server/private_message',
                    data: {message: message, conversationId: userId},
                  });
                  props.navigation.navigate('Videochat', {
                    value: 'video',
                    name: name,
                  });
                }}
              />
              <Icon
                style={{marginLeft: 15, color: '#fff'}}
                name={'call'}
                size={25}
                color={'white'}
                onPress={() => {
                  var message = {
                    text: 'Audio Chat Started',
                    user: {_id: global.user_chatid2},
                    createdAt: new Date('2021-05-12T08:15:39.869Z'),
                    _id: userId,
                  };
                  dispatch({
                    type: 'private_message',
                    data: {message: message, conversationId: userId},
                  });
                  dispatch({
                    type: 'server/private_message',
                    data: {message: message, conversationId: userId},
                  });
                  props.navigation.navigate('Videochat', {
                    value: 'audio',
                    name: name,
                  });
                }}
              />
            </>
          }
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
