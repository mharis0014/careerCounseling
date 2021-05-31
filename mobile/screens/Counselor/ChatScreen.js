import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Avatar, Icon} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  SlideAnimation,
} from 'react-native-popup-dialog';

export default function ChatScreen(props) {
  const dispatch = useDispatch();
  const selfUser = useSelector((state) => state.selfUser);
  var conversations = useSelector((state) => state.conversations);
  const userId = props.route.params.userId;
  const username = props.route.params.name;
  const [visible, setVisible] = useState(false);
  var messages_main =
    conversations[userId].messages == undefined
      ? []
      : conversations[userId].messages;
  global.dialogtitle = username + ' is Calling You';
  if (messages_main.length !== 0) {
    var message_new = messages_main[0].text;
    console.log('Last Message is ' + message_new);
    console.log('Length is ' + messages_main.length);
    if (message_new === 'Video Chat Started' && !global.call) {
      console.log('Reached here Video');
      fetch('http://10.0.2.2:3001/getallusers_videoid')
        .then((res) => res.json())
        .then((resJson) => {
          console.log('Get all users is ' + props.route.params.name);
          for (var i = 0; i < resJson.length; ++i) {
            if (resJson[i].email == props.route.params.name) {
              global.sessionid = '' + resJson[i].sessionId;
              global.tokenid = '' + resJson[i].tokenid;
            }
          }
          console.log('Session id is ' + global.sessionid);
          setVisible(true);

          var message = {
            text: 'Video Chat Begin',
            user: {_id: global.user_chatid2},
            createdAt: new Date('2021-05-12T08:15:39.869Z'),
            _id: userId,
          };
          dispatch({
            type: 'private_message',
            data: {message: message, conversationId: userId},
          });
        })
        .catch((e) => console.log(e));
    } else if (message_new === 'Audio Chat Started' && !global.call) {
      console.log('Reached here Video');
      fetch('http://10.0.2.2:3001/getallusers_videoid')
        .then((res) => res.json())
        .then((resJson) => {
          console.log('Get all users is ' + props.route.params.name);
          for (var i = 0; i < resJson.length; ++i) {
            if (resJson[i].email == props.route.params.name) {
              global.sessionid = '' + resJson[i].sessionId;
              global.tokenid = '' + resJson[i].tokenid;
            }
          }
          console.log('Session id is ' + global.sessionid);
          setVisible(true);

          var message = {
            text: 'Audio Chat Begin',
            user: {_id: global.user_chatid2},
            createdAt: new Date('2021-05-12T08:15:39.869Z'),
            _id: userId,
          };
          dispatch({
            type: 'private_message',
            data: {message: message, conversationId: userId},
          });
        })
        .catch((e) => console.log(e));
    }
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
        rightComponent={
          <Icon
            style={{marginLeft: 15, color: '#fff'}}
            name={'videocam'}
            size={25}
            color={'white'}
          />
        }
        onTouchEnd={() => {
          console.log('Consoler type is ' + props.route.params.type);
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

      <View style={styles.container}>
        <Dialog
          visible={visible}
          onTouchOutside={() => {
            setVisible(false);
            // setdialog_visible_view(false);
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          dialogTitle={
            <View style={{marginLeft: 18, marginTop: 20}}>
              <Text>{global.dialogtitle}</Text>
            </View>
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="REJECT"
                onPress={() => {
                  var message = {
                    text: 'Call Ended',
                    user: {_id: global.user_chatid2},
                    createdAt: new Date('2021-05-12T08:15:39.869Z'),
                    _id: userId,
                  };
                  dispatch({
                    type: 'private_message',
                    data: {message: message, conversationId: userId},
                  });
                  setVisible(false);
                }}
              />
              <DialogButton
                text="ACCEPT"
                onPress={() => {
                  var checkmessage = messages_main[0].text;
                  var message = {
                    text: 'Call In Process',
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
                  setVisible(false);
                  if (checkmessage === 'Audio Chat Started') {
                    props.navigation.navigate('Videochat', {value: 'audio'});
                  } else {
                    props.navigation.navigate('Videochat', {value: 'video'});
                  }
                }}
              />
            </DialogFooter>
          }>
          <DialogContent>
            <Text>
              To answer the call press Accept button. To reject press Reject
              Button
            </Text>
          </DialogContent>
        </Dialog>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
