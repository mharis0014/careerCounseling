import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import Styles from '../../styles/stripeStyles';
import stripe from 'react-native-stripe-payments';
import {CreditCardInput} from 'react-native-input-credit-card';
const Pay = ({navigation}) => {
  const [card, setCard] = useState({});
  const [iosKeyboardView, setiosKeyboardView] = useState('padding');
  const [androidKeyboardView, setandroidKeyboardView] = useState('height');

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
            <Button
              title="Credit"
              onPress={() => {
                stripeIntegration();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default Pay;
