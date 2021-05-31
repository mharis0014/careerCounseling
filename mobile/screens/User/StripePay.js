import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Button,
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native';
import Styles from '../../styles/stripeStyles';
import stripe from 'react-native-stripe-payments';
import {CreditCardInput} from 'react-native-input-credit-card';
import AsyncStorage from '@react-native-community/async-storage';

const Pay = (props, { navigation }) => {
  
  const [userId, setUserid] = useState('');
  const [userName, setUsername] = useState('');
  const [userEmail, setUseremail] = useState('');
  const [card, setCard] = useState({});
  const [toggle, setToggle] = useState(false);
  const [iosKeyboardView, setiosKeyboardView] = useState('padding');
  const [androidKeyboardView, setandroidKeyboardView] = useState('height');

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
    setUsername(afterParse.userName);
    setUseremail(afterParse.userEmail);
  };

  const onChange = (cardInfo) => {
    cardInfo.status.number == 'valid' &&
    cardInfo.status.cvc == 'valid' &&
    cardInfo.status.expiry == 'valid'
      ? console.log(cardInfo)
      : console.log('not valid');
  };

  // const onChange = cardInfo => {
  //   cardInfo.valid ? setCard(cardInfo.values) : null;
  // };
  const stripeIntegration = async () => {
    console.log(card);
    stripe.setOptions({
      publishingKey:
        'pk_test_51ITDHqL3WyeuqdKMmtjhweDyvD5liUcNlXK2qni59zAuo5p3IK5LS8bqNgJGD7Sje5Rb1dTblCN0jqai1FtETMGT00RHKe6T1d',
    });
    const isCardValid = stripe.isCardValid({
      number: card.number,
      expMonth: parseInt(card.expiry.split('/')[0]),
      expYear: parseInt(card.expiry.split('/')[1]),
      cvc: card.cvc,
    });
    console.log(isCardValid);
    setToggle(!toggle);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? iosKeyboardView : androidKeyboardView}
        style={Styles.body}>
        <View style={Styles.card_container}>
          <Text style={Styles.heading_text}>Debit / Credit card</Text>
          <CreditCardInput onChange={onChange} />
          <View style={Styles.add_credit_button}>
            <Button title="Credit" onPress={() => stripeIntegration()} />
            <Button
              disabled={toggle ? true : false}
              title="Done"
              onPress={() => sendCred()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default Pay;
