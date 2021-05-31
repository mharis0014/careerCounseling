import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';

const EasypaisaQR = (props) => {
  const [userId, setUserid] = useState('');
  const [userName, setUsername] = useState('');
  const [userEmail, setUseremail] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const counselorId = props.route.params.counselorId;
  const counselorName = props.route.params.counselorName;
  const counselorImage = props.route.params.counselorImage;
  const counselorEmail = props.route.params.counselorEmail;
  const pakage = props.route.params.pakage;
  const price = props.route.params.price;
  const date = props.route.params.date;

  useEffect(() => {
    getUserData();
  }, []);

  const sendCred = async (props) => {
    fetch('http://10.0.2.2:3001/appointment', {
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
        price: price,
        status: 'pending',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          console.log(data);
          ToastAndroid.show('Payment Done Successfully !', ToastAndroid.SHORT);
          props.navigation.replace('Appointments Screen');
        } catch (e) {
          console.log(e);
        }
      });
  };

  const getUserData = async () => {
    const afterParse = JSON.parse(await AsyncStorage.getItem('item'));
    setUserid(afterParse.userId);
    console.log(afterParse);
    console.log(afterParse.userId);
    setUsername(afterParse.userName);
    setUseremail(afterParse.userEmail);
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
        <View style={{flexDirection: 'row', paddingBottom: 10}}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
          />
          <Text style={{color: '#009999', fontSize: 17, paddingTop: 4}}>
            Paid Successfully ? Press me
          </Text>
        </View>
        <Button
          disabled={toggleCheckBox ? false : true}
          title="Continue"
          onPress={() => sendCred(props)}
        />
        <Text style={{color: '#008080', paddingVertical: 20}}>
          <Text style={{color: 'red'}}>Note: </Text> After pressing continue
          button you appointment will be accepted by our Team in an hour or two.
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
