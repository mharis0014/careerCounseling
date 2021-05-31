import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userCred = async (props) => {
    fetch('http://10.0.2.2:3001/userSignin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          var items = {
            userId: data[0],
            userName: data[1],
            userEmail: data[2],
            token: data[3],
          };
          await AsyncStorage.setItem('item', JSON.stringify(items));
          dispatch({type: 'server/join', data: 'u_' + email}); //Without Check else will not work
          global.c_user = email;
          if (data[3] !== undefined) {
            props.navigation.replace('Home Screen');
            ToastAndroid.show('Logged in successfully !', ToastAndroid.SHORT);
          } else {
            Alert.alert('Login Failed', "Enter valid credentials");
          }
        } catch (e) {
          console.log(e);
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.replace('User Signup Screen');
          }}
          style={{alignSelf: 'flex-end'}}>
          <Text style={{color: '#64e764', fontSize: 17, padding: 10}}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <View style={{paddingTop: 10}}>
          <Image
            style={{height: 210, width: 210}}
            source={require('../../assets/logo_transparent.png')}
          />
        </View>
        <Text style={{fontSize: 17, padding: 5}}>Welcome Friends !!</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
          />
          <Text style={{marginBottom: 25}}>Forgot Password ?</Text>
          <View style={[styles.textInput, styles.btn]}>
            <TouchableOpacity onPress={() => userCred(props)}>
              <Text style={styles.btnTxt}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={{alignSelf: 'center'}}>
            Don't have Account ?{' '}
            <TouchableOpacity
              onPress={() => props.navigation.replace('User Signup Screen')}>
              <Text style={{color: '#64e764'}}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textInputContainer: {
    paddingTop: 30,
    width: '85%',
    height: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 6,
    padding: 13,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#64e764',
    marginBottom: 40,
  },
  btnTxt: {
    alignSelf: 'center',
    color: '#fff',
    padding: 3,
    fontSize: 15,
  },
});

export default LoginScreen;
