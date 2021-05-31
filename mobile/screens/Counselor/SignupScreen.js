import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  Alert,
} from 'react-native';
import {ActionSheet, Root} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';

const digNchar = /^[0-9*#+]+$/;
const nameRjx = /^([A-Za-z]+?)\s([A-Za-z]+?)$/;
const emailRjx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const medRjx = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
const strRjx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: {
        contentType: '',
        data: require('../../assets/doci.png'),
      },
      pic: require('../../assets/doci.png'),
      name: '',
      email: '',
      education: '',
      about: '',
      password: '',
      nameErr: '',
      emailErr: '',
      passErr: '',
    };
  }

  onSelectedImage = (image) => {
    let newDataImg = this.state.fileList;
    const source = {uri: image.path};
    let item = {
      contentType: 'image/jpg',
      data: image.data,
    };
    this.setState({pic: source, fileList: item});
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.7,
      cropping: false,
      includeBase64: true,
    }).then((image) => {
      console.log('takePhotoFromCamera', image);
      this.onSelectedImage(image);
    });
  };

  ChoosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.7,
      cropping: false,
      includeBase64: true,
    }).then((image) => {
      this.onSelectedImage(image);
    });
  };

  onClickAddImage = () => {
    var BUTTONS = ['Take Photo', 'Choose Photo Library', 'Cancel'];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: 'Select a Photo',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.takePhotoFromCamera();
            break;
          case 1:
            this.ChoosePhotoFromLibrary();
            break;
          default:
            break;
        }
      },
    );
  };

  nameValidator = () => {
    console.log({name: this.state.name});
    let digNcharValid = digNchar.test(this.state.name);
    let nameValid = nameRjx.test(this.state.name);

    if (this.state.name == '') {
      this.setState({nameErr: 'name field cannot be empty'});
    } else if (digNcharValid) {
      this.setState({nameErr: 'name must be alphabetic'});
    } else if (!nameValid) {
      this.setState({nameErr: 'please enter fullname here'});
    } else {
      this.setState({nameErr: ''});
    }
  };

  emailValidator = () => {
    let emailValid = emailRjx.test(this.state.email);
    if (this.state.email == '') {
      this.setState({emailErr: 'email field cannot be empty'});
    } else if (!emailValid) {
      this.setState({emailErr: 'You have entered an invalid email address'});
    } else {
      this.setState({emailErr: ''});
    }
  };

  passValidator = () => {
    let strong = strRjx.test(this.state.password);
    let medium = medRjx.test(this.state.password);
    if (this.state.password == '') {
      this.setState({passErr: 'password field cannot be empty'});
    } else if (!medium) {
      this.setState({
        passErr:
          'very weak password. your password must be a combination of capital letters(A-Z), alphabets(a-z) and numbers(0-9)',
      });
    } else if (!strong) {
      this.setState({
        passErr:
          'medium strength. use special characters for a strong password',
      });
    } else {
      this.setState({passErr: ''});
    }
  };

  sendCred = async (props) => {
    fetch('http://10.0.2.2:3001/counselorSignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileList: this.state.fileList,
        name: this.state.name,
        email: this.state.email,
        education: this.state.education,
        about: this.state.about,
        password: this.state.password,
        status: 'requested',
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          let nameValid = nameRjx.test(this.state.name);
          let emailValid = emailRjx.test(this.state.email);
          let medium = medRjx.test(this.state.password);
          if (nameValid && emailValid && medium) {
            console.log(this.state.fileList.data);
            console.log(data.token);
            await AsyncStorage.setItem('token', data.token);
            this.props.navigation.replace('Login Screen');
            ToastAndroid.show('Signed up successfully !', ToastAndroid.SHORT);
          } else {
            Alert.alert(
              'Wrong credentials',
              'You have entered the invalid credentials. Please follow the instructions!',
              [{text: 'OK'}],
            );
          }
        } catch (e) {
          console.log('error on Register Counselor Screen line 114');
        }
      });
  };

  render() {
    let {pic} = this.state;
    return (
      <Root>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login Screen')}
                style={{alignSelf: 'flex-end'}}>
                <Text style={{color: '#64e764', fontSize: 17, padding: 10}}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onClickAddImage}
                style={{paddingTop: 10}}>
                <Image
                  style={{height: 150, width: 150, borderRadius: 80}}
                  source={pic}
                />
              </TouchableOpacity>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="Name"
                  value={this.state.name}
                  onBlur={() => this.nameValidator()}
                  onChangeText={(text) => this.setState({name: text})}
                  style={styles.textInput}
                />
                <Text style={styles.errTxt}>{this.state.nameErr}</Text>
                <TextInput
                  placeholder="Email"
                  value={this.state.email}
                  onBlur={() => this.emailValidator()}
                  onChangeText={(text) => this.setState({email: text})}
                  style={styles.textInput}
                />
                <Text style={styles.errTxt}>{this.state.emailErr}</Text>
                <TextInput
                  placeholder="Education"
                  value={this.state.education}
                  onChangeText={(text) => this.setState({education: text})}
                  style={[styles.textInput, {marginBottom: 20}]}
                />
                <TextInput
                  placeholder="About"
                  editable={true}
                  numberOfLines={4}
                  multiline={true}
                  maxLength={200}
                  value={this.state.about}
                  onChangeText={(text) => this.setState({about: text})}
                  style={[styles.textInput, {marginBottom: 20}]}
                />
                <TextInput
                  placeholder="Password"
                  value={this.state.password}
                  onBlur={() => this.passValidator()}
                  onChangeText={(text) => this.setState({password: text})}
                  style={styles.textInput}
                />
                <Text style={styles.errTxt}>{this.state.passErr}</Text>
                <TouchableOpacity
                  onPress={(props) => this.sendCred(props)}
                  style={[styles.textInput, styles.btn]}>
                  <Text style={styles.btnTxt}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Root>
    );
  }
}

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
