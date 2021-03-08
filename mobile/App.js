import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from 'react-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import {createStore, applyMiddleware} from 'redux';
import io from 'socket.io-client';

import WelcomeScreen from './screens/WelcomeScreen';
import SelectUserScreen from './screens/SelectUserScreen';

import UserLoginScreen from './screens/User/UserLoginScreen';
import UserSignupScreen from './screens/User/UserSignupScreen';
import HomeScreen from './screens/User/HomeScreen';
import DocListScreen from './screens/User/DocListScreen';
import ProfileCardScreen from './screens/User/ProfileCardScreen';
import FriendScreen from './screens/User/FriendScreen';
import ChatScreen from './screens/User/ChatScreen';

import CounselorLoginScreen from './screens/Counselor/CounselorLoginScreen';
import RegisterCounselorScreen from './screens/Counselor/RegisterCounselorScreen';
import CounserlorHomeScreen from './screens/Counselor/CounselorHomeScreen';
import CounserlorMainScreen from './screens/Counselor/CounselorMainScreen';
import CounselorChatScreen from './screens/Counselor/CounselorChatScreen';

import AsyncStorage from '@react-native-community/async-storage';
import UserList from './screens/Counselor/UserListScreen';

const Stack = createStackNavigator();

const UserStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="User Login Screen">
      <Stack.Screen name="User Login Screen" component={UserLoginScreen} />
      <Stack.Screen name="User Signup Screen" component={UserSignupScreen} />
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Screen name="Doc List Screen" component={DocListScreen} />
      <Stack.Screen name="Profile Card" component={ProfileCardScreen} />
      <Stack.Screen name="Friend Screen" component={FriendScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const CounselorStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login Screen">
      <Stack.Screen name="Login Screen" component={CounselorLoginScreen} />
      <Stack.Screen name="Signup" component={RegisterCounselorScreen} />
      <Stack.Screen name="Counselor Home Screen" component={CounserlorHomeScreen} />
      <Stack.Screen name="User List Screen" component={UserList} />
      <Stack.Screen name="CChat" component={CounselorChatScreen} />
      <Stack.Screen name="Main Screen" component={CounserlorMainScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const App = ({navigation}) => {

  const socket = io('http://192.168.18.3:3000');
  const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
  
  function reducer(state = { conversations: {} }, action) {
    switch (action.type) {
      case 'users_online':
        const conversations = {...state.conversations};
        const usersOnline = action.data;
        for (let i=0; i<usersOnline.length; i++) {
          const userId = usersOnline[i].userId;
          if (conversations[userId] === undefined) {
            conversations[userId] = {
              messages: [],
              username: usersOnline[i].username
            }
          }
        }
        return {...state, usersOnline, conversations};
      case 'private_message':
        const conversationId = action.data.conversationId;
        return {
          ...state,
          conversations: {
            ...state.conversations,
            [conversationId]: {
              ...state.conversations[conversationId],
              messages: [
                action.data.message,
                ...state.conversations[conversationId].messages
              ]
            }
          }
        }
      case 'self_user':
        
        return {...state, selfUser: action.data};
      default:
        return state;
    }
    
  }
  
  const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
  
  store.subscribe(() => {
    console.log('new state', store.getState());
  });

  const [isloggedin, setLogged] = useState(null);

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Select User Screen">
        {/* <Stack.Screen name="Welcome Screen" component={WelcomeScreen} /> */}
        <Stack.Screen name="Select User Screen" component={SelectUserScreen} />
        <Stack.Screen name="User Stack" component={UserStack} />
        <Stack.Screen name="Counselor Stack" component={CounselorStack} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
