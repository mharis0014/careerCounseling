import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import {createStore, applyMiddleware} from 'redux';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import SelectUserScreen from '../screens/SelectUserScreen';

import UserLogin from '../screens/User/LoginScreen';
import UserSignup from '../screens/User/SignupScreen';
import UserHome from '../screens/User/HomeScreen';
import DocList from '../screens/User/DocListScreen';
import Appointments from '../screens/User/Appointments';
import ProfileCard from '../screens/User/ProfileCardScreen';
import Pricing from '../screens/User/PricingScreen';
import Ratings from '../screens/User/RateScreen';
import PaymentOption from '../screens/User/PayOptScreen';
import EasypaisaQR from '../screens/User/EasypaisaQR';
import StripePay from '../screens/User/StripePay';
import UserChat from '../screens/User/ChatScreen';

import QuizScreen from '../screens/AI/QuizScreen';
import Report from '../screens/AI/Report';
import Popup from '../components/Popup';

import CounselorLogin from '../screens/Counselor/LoginScreen';
import CounselorSignup from '../screens/Counselor/SignupScreen';
import CounselorHome from '../screens/Counselor/HomeScreen';
import CounselorMain from '../screens/Counselor/MainScreen';
import CounselorChat from '../screens/Counselor/ChatScreen';
import Inbox from '../screens/Counselor/Inbox';

import VideoChat from '../screens/VideoChat/VideoChat';

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="User Login Screen">
      <Stack.Screen name="User Login Screen" component={UserLogin} />
      <Stack.Screen name="User Signup Screen" component={UserSignup} />
      <Stack.Screen name="Home Screen" component={UserHome} />
      <Stack.Screen name="Paid User Stack" component={UserStackPaid} />
      <Stack.Screen name="Free User Stack" component={UserStackFree} />
    </Stack.Navigator>
  );
};

const UserStackPaid = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Doc List Screen">
      <Stack.Screen name="Doc List Screen" component={DocList} />
      <Stack.Screen name="Appointments Screen" component={Appointments} />
      <Stack.Screen name="Profile Card" component={ProfileCard} />
      <Stack.Screen name="Popup" component={Popup} />
      <Stack.Screen name="Pricing Screen" component={Pricing} />
      <Stack.Screen name="Ratings Screen" component={Ratings} />
      <Stack.Screen name="Payment Opt Screen" component={PaymentOption} />
      <Stack.Screen name="ScanQR Screen" component={EasypaisaQR} />
      <Stack.Screen name="Stripe Payment" component={StripePay} />
      <Stack.Screen name="Chat Screen" component={UserChat} />
      <Stack.Screen name="Videochat" component={VideoChat} />
    </Stack.Navigator>
  );
};

const UserStackFree = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Quiz Screen">
      <Stack.Screen name="Quiz Screen" component={QuizScreen} />
      <Stack.Screen name="Report Screen" component={Report} />
    </Stack.Navigator>
  );
};

const CounselorStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login Screen">
      <Stack.Screen name="Login Screen" component={CounselorLogin} />
      <Stack.Screen name="Signup Screen" component={CounselorSignup} />
      <Stack.Screen name="Counselor Home Screen" component={CounselorHome} />
      <Stack.Screen name="Inbox Screen" component={Inbox} />
      <Stack.Screen name="Main Screen" component={CounselorMain} />
      <Stack.Screen name="Chat Screen" component={CounselorChat} />
      <Stack.Screen name="Videochat" component={VideoChat} />
    </Stack.Navigator>
  );
};

const Navigation = (props) => {
  const socket = io('http://192.168.100.7:3001');
  const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

  function reducer(state = {conversations: {}}, action) {
    switch (action.type) {
      case 'users_online':
        const conversations = {...state.conversations};
        const usersOnline = action.data;
        for (let i = 0; i < usersOnline.length; i++) {
          const userId = usersOnline[i].userId;
          conversations[userId] = {
            messages: [],
            username: usersOnline[i].username,
          };
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
                ...state.conversations[conversationId].messages,
              ],
            },
          },
        };
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
          initialRouteName="Welcome Screen">
          <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
          <Stack.Screen name="SelectUser Screen" component={SelectUserScreen} />
          <Stack.Screen name="User Stack" component={UserStack} />
          <Stack.Screen name="Counselor Stack" component={CounselorStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigation;
