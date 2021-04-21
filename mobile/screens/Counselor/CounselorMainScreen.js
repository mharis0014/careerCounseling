import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icone from 'react-native-vector-icons/Entypo';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import {Badge} from 'react-native-elements';
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
const Messages = (props) => {
  const usersOnline = useSelector((state) => state.usersOnline);

  const renderSeparator = () => (
    <View
      style={{
        marginBottom: -20,
      }}
    />
  );


  return (
    <View style={{flex: 1}}>
      <FlatList
        data={usersOnline}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({item}) => {
          if (item.username != global.curr_user) {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: '#f2f2f2',
                  width: '100%',
                  height: '100%',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Chat', {
                      name: item.username,
                      userId: item.userId,
                    })
                  }
                  style={{
                    width: '95%',
                    height: 100,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    elevation: 5,
                    margin: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{padding: 17}}>
                      <Image
                        style={{height: 60, width: 60, borderRadius: 30}}
                        source={require('../../assets/logo_transparent.png')}
                      />
                    </View>
                    <View style={{paddingTop: 20}}>
                      <Text style={{fontSize: 20}}>{item.username}</Text>

                      <Text
                        style={{
                          color: '#888',
                          paddingTop: 10,
                          fontWeight: 'bold',
                        }}>
                        Put the Fucking message here!
                      </Text>
                    </View>
                    <View style={{paddingTop: 20, paddingLeft: 35}}>
                      <Text style={{color: '#888'}}>7:12 PM</Text>
                      <View
                        style={{paddingTop: 17, paddingLeft: 22, fontSize: 15}}>
                        <Badge value="1" status="error" />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }
        }}
        keyExtractor={(item) => item.userId}
      />
    </View>
  );
};

const CounselorMainScreen = () => {
  // const c_name  = props.route.params.c_name;
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

export default CounselorMainScreen;
