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

const HomeScreen = (props) => {
  const [email, setEmail] = useState('loading');

  const boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://10.0.2.2:3000/', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmail(data.email);
      });
  };

  useEffect(() => {
    boiler();
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
          onPress={() => props.navigation.navigate('Doc List Screen')}
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
