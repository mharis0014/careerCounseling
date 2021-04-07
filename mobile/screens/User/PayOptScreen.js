import React, {useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import Icone from 'react-native-vector-icons/Entypo';
import Iconm from 'react-native-vector-icons/MaterialIcons';
function PayOptScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Button title="Show modal" onPress={toggleModal} />
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
            <View style={[styles.card, {backgroundColor: '#99cc00'}]}>
              <Iconm name="payment" size={38} color="#fff" />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.textBold}>EASYPAISA</Text>
                <Text style={styles.textSmall}>Check Booked Appointments</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.card, {backgroundColor: '#3b7bbf'}]}
              onPress={() => Navigation.navigation('pay')}>
              <Icone name="paypal" size={38} color="#fff" />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.textBold}>PAYPAL</Text>
                <Text style={styles.textSmall}>Check Your Notifications</Text>
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
