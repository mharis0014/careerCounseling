import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {ActionSheet, Root} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: require('../../assets/doc_pr.png'),
      name: '',
      email: '',
      education: '',
      about: '',
      password: '',
      pic: require('../../assets/doc_pr.png'),
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

  sendCred = async (props) => {
    fetch('http://10.0.2.2:3000/counselorSignup', {
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
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          console.log(this.state.fileList.data);
          console.log(data.token);
          await AsyncStorage.setItem('token', data.token);
          this.props.navigation.replace('Login Screen');
        } catch (e) {
          console.log('error on Register Counselor Screen line 114');
        }
      });
  };

  render() {
    let {fileList} = this.state;
    let {pic} = this.state;
    return (
      <Root>
        <ScrollView>
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
                onChangeText={(text) => this.setState({name: text})}
                style={styles.textInput}
              />
              <TextInput
                placeholder="Email"
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
                style={styles.textInput}
              />
              <TextInput
                placeholder="Education"
                value={this.state.education}
                onChangeText={(text) => this.setState({education: text})}
                style={styles.textInput}
              />
              <TextInput
                placeholder="About"
                editable={true}
                numberOfLines={4}
                multiline={true}
                maxLength={200}
                value={this.state.about}
                onChangeText={(text) => this.setState({about: text})}
                style={styles.textInput}
              />
              <TextInput
                placeholder="Password"
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
                style={styles.textInput}
              />
              <TouchableOpacity
                onPress={(props) => this.sendCred(props)}
                style={[styles.textInput, styles.btn]}>
                <Text style={styles.btnTxt}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
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
