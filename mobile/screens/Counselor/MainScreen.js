import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../../styles/InboxStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Icone from 'react-native-vector-icons/Entypo';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Appointment"
      tabBarOptions={{
        activeTintColor: '#4d79ff',
        showIcon: true,
        showLabel: false,
        style: {backgroundColor: '#2eb8b8'},
      }}>
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarIcon: () => (
            <Icon name="md-calendar-outline" size={25} color="#fff" />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: () => (
            <Icon name="notifications" size={25} color="#fff" />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: () => <Icone name="message" size={25} color="#fff" />,
        }}
      />
      <Tab.Screen
        name="Calls"
        component={Calls}
        options={{
          tabBarIcon: () => <Iconm name="call" size={25} color="#fff" />,
        }}
      />
    </Tab.Navigator>
  );
}

const Appointment = (props) => {
  return <Text>Appointment</Text>;
};
const Notifications = (props) => {
  return <Text>Notifications</Text>;
};
const Calls = (props) => {
  return <Text>Calls</Text>;
};

const Messages = (props, {navigation}) => {
  const usersOnline = useSelector((state) => state.usersOnline);
  return (
    <Container>
      <FlatList
        data={usersOnline}
        keyExtractor={(item) => item.userId}
        renderItem={({item}) => {
          return !item.username.toLowerCase().trim().startsWith('c_') ? (
            <Card
              onPress={() => {
                console.log('Reached here');
                console.log(item.username.substring(2));
                props.navigation.navigate('Chat Screen', {
                  name: item.username.substring(2),
                  userId: item.userId,
                });
              }}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg
                    source={require('../../assets/user.png')}
                  />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.username.substring(2)}</UserName>
                    <PostTime>2 hours ago</PostTime>
                  </UserInfoText>
                  <MessageText>
                    Hey there, this is my test for chat App in react native!.
                  </MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          ) : (
            <View />
          );
        }}
      />
    </Container>
  );
};

const MainScreen = () => {
  return <MyTabs />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default MainScreen;
