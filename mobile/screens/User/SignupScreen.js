import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SignupScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');

  let digNchar = /^[0-9*#+]+$/;
  let nameRjx = /^([A-Za-z]+?)\s([A-Za-z]+?)$/;
  let emailRjx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let medRjx = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  let strRjx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  let digNcharValid = digNchar.test(name);
  let nameValid = nameRjx.test(name);
  let emailValid = emailRjx.test(email);
  let strong = strRjx.test(password);
  let medium = medRjx.test(password);

  const nameValidator = () => {
    if (name == '') {
      setNameErr('name field cannot be empty');
    } else if (digNcharValid) {
      setNameErr('name field must be alphabetic');
    } else if (!nameValid) {
      setNameErr('please enter fullname here');
    } else {
      setNameErr('');
    }
  };

  const emailValidator = () => {
    if (email == '') {
      setEmailErr('email field cannot be empty');
    } else if (!emailValid) {
      setEmailErr('You have entered an invalid email address');
    } else {
      setEmailErr('');
    }
  };

  const passValidator = () => {
    if (password == '') {
      setPassErr('password field cannot be empty');
    } else if (!medium) {
      setPassErr(
        'very weak password. your password must be a combination of capital letters(A-Z), alphabets(a-z) and numbers(0-9)',
      );
    } else if (!strong) {
      setPassErr(
        'medium strength. use special characters for a strong password',
      );
    } else {
      setPassErr('');
    }
  };

  const sendCred = async (props) => {
    fetch('http://10.0.2.2:3001/userSignup', {
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
          console.log(data.token);
          console.log(password);
          if (nameValid && emailValid && medium) {
            await AsyncStorage.setItem('token', data.token);
            props.navigation.replace('User Login Screen');
            ToastAndroid.show('Signed up successfully !', ToastAndroid.SHORT);
          } else {
            Alert.alert(
              'Wrong credentials',
              'You have entered the invalid credentials. Please follow the instructions!',
              [{text: 'OK'}],
            );
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
          onPress={() => props.navigation.replace('User Login Screen')}
          style={{alignSelf: 'flex-end'}}>
          <Text style={{color: '#64e764', fontSize: 17, padding: 10}}>
            Login
          </Text>
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
            keyboardType="default"
            value={name}
            onBlur={() => nameValidator()}
            onChangeText={(text) => setName(text)}
            style={styles.textInput}
          />
          <Text style={styles.errTxt}>{nameErr}</Text>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onBlur={() => emailValidator()}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
          />
          <Text style={styles.errTxt}>{emailErr}</Text>
          <TextInput
            placeholder="Password"
            keyboardType="default"
            maxLength={10}
            secureTextEntry={true}
            value={password}
            onBlur={() => passValidator()}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
          />
          <Text style={styles.errTxt}>{passErr}</Text>
          <TouchableOpacity
            onPress={() => sendCred(props)}
            style={[styles.textInput, styles.btn]}>
            <Text style={styles.btnTxt}>Sign Up</Text>
          </TouchableOpacity>
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
  errTxt: {
    color: 'red',
    fontStyle: 'italic',
  },
});

export default SignupScreen;
