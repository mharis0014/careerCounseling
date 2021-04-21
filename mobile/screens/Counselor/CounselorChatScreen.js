import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const CounselorChatScreen = (props) => {
  const usersOnline = useSelector((state) => state.usersOnline);
  useEffect(() => {
    const allusers = JSON.parse(JSON.stringify(usersonline));
    for (var i = 0; i < allusers.length; ++i) {
      console.log('All users is ' + allusers[i].username);
      console.log('Email is ' + global.curr_user);
      if (allusers[i].username.trim() === global.curr_user.trim()) {
        global.user_chatid2 = allusers[i].userId;
      }
    }
  }, []);
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
                    <Text style={{fontSize: 15}}>{item.username}</Text>
                    <Text
                      style={{
                        color: '#888',
                        paddingTop: 10,
                        fontWeight: 'bold',
                      }}>
                      hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                    </Text>
                  </View>
                  <View style={{paddingTop: 20, paddingLeft: 40}}>
                    <Text style={{color: '#888'}}>7:12 PM</Text>
                    <Text
                      style={{paddingTop: 13, paddingLeft: 13, fontSize: 15}}>
                      🔔
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.userId}
      />
    </View>
  );
};

export default CounselorChatScreen;
