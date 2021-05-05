import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';

const EasypaisaQR = (props) => {
  const [userId, setUserid] = useState('');
  const [userName, setUsername] = useState('');
  const [userEmail, setUseremail] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const getUserDate = async () => {
    const afterParse = JSON.parse(await AsyncStorage.getItem('item'));
    setUserid(afterParse.userId);
    setUsername(afterParse.userName);
    setUseremail(afterParse.userEmail);
  };

  useEffect(() => {
    getUserDate();
  }, []);

  const counselorId = props.route.params.counselorId;
  const counselorName = props.route.params.counselorName;
  const counselorImage = props.route.params.counselorImage;
  const counselorEmail = props.route.params.counselorEmail;
  const pakage = props.route.params.pakage;
  const date = props.route.params.date;
  // const afterParse = AsyncStorage.getItem('item');

  const sendCred = async (props) => {
    fetch('http://10.0.2.2:3000/appointment', {
      Accept: 'application/json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userId,
        userName: userName,
        userEmail: userEmail,
        counselorEmail: counselorEmail,
        counselorName: counselorName,
        counselorId: counselorId,
        counselorImg: counselorImage,
        date: date,
        pakage: pakage,
        status: 'pending',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={{paddingTop: 1, flex: 1}}>
        <Image
          style={{height: 50, width: 250}}
          source={require('../../assets/easypaisa.png')}
        />
      </View>
      <Text style={{color: '#99cc00', fontSize: 18}}>
        Scan my EasyPaisa QR to pay
      </Text>
      <View style={{paddingTop: 30, flex: 3}}>
        <Image
          style={{height: 250, width: 250}}
          source={require('../../assets/qrcode.png')}
        />
      </View>
      <View style={{flex: 2, padding: 20}}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={{color: '#009999', fontSize: 18, paddingVertical: 20}}>
          Pay through easypaisa and press countinue
        </Text>
        <Button title="Continue" onPress={() => sendCred()} />
        <Text style={{color: '#008080', paddingVertical: 20}}>
          After pressing continue button you appointment will be accepted by our
          Team in an hour or two.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default EasypaisaQR;
