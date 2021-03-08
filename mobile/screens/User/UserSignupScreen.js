import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const UserSignupScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendCred = async (props) => {
    fetch('http://10.0.2.2:3000/userSignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          console.log(data);
          console.log(data.token);
          await AsyncStorage.setItem('token', data.token);
          props.navigation.replace('User Login Screen');
        } catch (e) {
          console.log(email);
          console.log(name);
          console.log(password);
          console.log(e);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.replace('User Login Screen')}
        style={{alignSelf: 'flex-end'}}>
        <Text style={{color: '#64e764', fontSize: 17, padding: 10}}>Login</Text>
      </TouchableOpacity>
      <View style={{paddingTop: 10}}>
        <Image
          style={{height: 210, width: 210}}
          source={require('../../assets/logo_transparent.png')}
        />
      </View>
      <Text style={{fontSize: 19, padding: 5}}>SignUp</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
        />
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
        <TouchableOpacity
          onPress={() => sendCred(props)}
          style={[styles.textInput, styles.btn]}>
          <Text style={styles.btnTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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

export default UserSignupScreen;
