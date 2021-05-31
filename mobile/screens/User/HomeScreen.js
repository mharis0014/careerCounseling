import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';

const HomeScreen = (props) => {
  const [email, setEmail] = useState('loading');
  const usersonline = useSelector((state) => state.usersOnline);
  const [onlineusers, setonlineusers] = useState(usersonline);
  const [chatid, setchatid] = useState('1234');

  const boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://10.0.2.2:3001/', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmail(data.email);
        sendchatid();
      });
  };
  const sendchatid = () => {
    console.log('Reached chat id');
    console.log(JSON.stringify(usersonline));
    console.log(global.c_user);
    const allusers = JSON.parse(JSON.stringify(usersonline));
    console.log(allusers.length);
    for (var i = 0; i < allusers.length; ++i) {
      console.log('All users is ' + allusers[i].username);
      console.log('Email is ' + global.c_user);
      if (allusers[i].username.trim() === global.c_user.trim()) {
        setchatid(allusers[i].userId);
        global.user_chatid2 = allusers[i].userId;
      }
    }
    console.log('Chat id is ' + chatid);
    fetch('http://10.0.2.2:3000/updatechatid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: global.c_user,
        chatid: chatid,
      }),
    })
      .then((res) => console.log(res.json()))
      .then(async (data) => {});
  };
  useEffect(() => {
    boiler();
    fetch('http://10.0.2.2:3000/savetoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        useremail: global.c_user,
      }),
    })
      .then((resJson) => {
        fetch('http://10.0.2.2:3000/getallusers_videoid')
          .then((res) => res.json())
          .then((resJson) => {
            for (var i = 0; i < resJson.length; ++i) {
              if (resJson[i].email == global.c_user) {
                global.sessionid = '' + resJson[i].sessionId;
                global.tokenid = '' + resJson[i].tokenid;
              }
            }
          })
          .catch((e) => console.log(e));
      })
      .then(async (data) => {});
  }, []);

  const logout = (props) => {
    AsyncStorage.removeItem('token').then(() => {
      props.navigation.replace('User Login Screen');
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => logout(props)}
          style={{alignSelf: 'flex-end'}}>
          <Text style={{color: '#64e764', fontSize: 17, padding: 10}}>
            Logout
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading}>
          Career & <Text style={{color: '#64e764'}}>Life</Text>Partner
        </Text>
        <Text>Choose a category which works best for you</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Paid User Stack')}
          style={[styles.customBtn, {backgroundColor: '#aef2ae'}]}>
          <View>
            <Text style={styles.btnHeading}>Career Counseling</Text>
            <Text style={styles.btnTxt}>
              I would hire a career counselor{'\n'}if it was affordable
            </Text>
          </View>
          <View style={{paddingTop: 83, paddingLeft: 23}}>
            <Image
              style={{height: 95, width: 95}}
              source={require('../../assets/1t.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Free User Stack')}
          style={[styles.customBtn, {backgroundColor: '#f8dae6'}]}>
          <View>
            <Text style={styles.btnHeading}>Free Advice Now</Text>
            <Text style={styles.btnTxt}>
              i would prefer free advice{'\n'}free advice for my career{'\n'}
              through AI
            </Text>
          </View>
          <View style={{paddingTop: 83, paddingLeft: 42}}>
            <Image
              style={{height: 110, width: 110}}
              source={require('../../assets/2t.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#93278f',
    margin: 35,
  },
  customBtn: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 30,
    height: 190,
    borderRadius: 30,
  },
  btnHeading: {
    fontSize: 20,
    paddingLeft: 40,
    paddingTop: 40,
    paddingBottom: 20,
  },
  btnTxt: {
    paddingLeft: 40,
    color: '#333',
  },
});

export default HomeScreen;
