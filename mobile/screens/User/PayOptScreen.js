import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Zocial';

function PayOptScreen(props) {
  
  const [isModalVisible, setModalVisible] = useState(true);
    const counselorId = props.route.params.counselorId;
    const counselorName = props.route.params.counselorName;
    const counselorImage = props.route.params.counselorImage;
    const counselorEmail = props.route.params.counselorEmail;
  const pakage = props.route.params.pakage;
  const price = props.route.params.price;
  const date = props.route.params.date;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{alignSelf: 'flex-end'}}>
              <Icon name="md-close-outline" size={38} color="#000" />
            </TouchableOpacity>
            <View style={{paddingTop: 10}}>
              <Image
                style={{height: 210, width: 210}}
                source={require('../../assets/logo_transparent.png')}
              />
            </View>
            <Text style={{fontSize: 17, paddingTop: 5, paddingBottom: 30}}>
              Choose a Payment Method
            </Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('ScanQR Screen', {
                  counselorImage: counselorImage,
                  counselorId: counselorId,
                  counselorName: counselorName,
                  counselorEmail: counselorEmail,
                  pakage: pakage,
                  price: price,
                  date: date,
                })
              }
              style={[styles.card, {backgroundColor: '#99cc00'}]}>
              <Iconm name="payment" size={38} color="#fff" />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.textBold}>EASYPAISA</Text>
                <Text style={styles.textSmall}>
                  Click to pay through Easypaisa
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.card, {backgroundColor: '#3b7bbf'}]}
              onPress={() =>
                props.navigation.navigate('Stripe Payment', {
                  counselorImage: counselorImage,
                  counselorId: counselorId,
                  counselorName: counselorName,
                  counselorEmail: counselorEmail,
                  pakage: pakage,
                  price: price,
                  date: date,
                })
              }>
              <Iconz name="stripe" size={38} color="#fff" />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.textBold}>STRIPE</Text>
                <Text style={styles.textSmall}>
                  Click to pay through Stripe
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={toggleModal} style={styles.btntwo}>
            <Text style={{alignSelf: 'center', color: '#fff', fontSize: 20}}>
              CONTINUE
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '17%',
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 20,
    elevation: 4,
    borderRadius: 4,
    marginTop: 10,
  },
  textBold: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  textSmall: {color: '#fff', fontSize: 12, fontWeight: 'bold'},
  btntwo: {
    backgroundColor: '#64e764',
    padding: 14,
    marginHorizontal: 0,
  },
});

export default PayOptScreen;
