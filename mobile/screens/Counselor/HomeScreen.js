import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icone from 'react-native-vector-icons/Entypo';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = (props) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Main Screen')}
        style={{paddingTop: 10}}>
        <Image
          style={{height: 280, width: 190}}
          source={require('../../assets/doc_icon.png')}
        />
      </TouchableOpacity>
      <View style={[styles.card, {backgroundColor: '#ffcc00'}]}>
        <Icon name="md-calendar-outline" size={38} color="#fff" />
        <View style={{paddingLeft: 10}}>
          <Text style={styles.textBold}>APPOINTMENTS</Text>
          <Text style={styles.textSmall}>Check Booked Appointments</Text>
        </View>
      </View>
      <View style={[styles.card, {backgroundColor: '#FF6161'}]}>
        <Icon name="notifications" size={38} color="#fff" />
        <View style={{paddingLeft: 10}}>
          <Text style={styles.textBold}>NOTIFICATIONS</Text>
          <Text style={styles.textSmall}>Check Your Notifications</Text>
        </View>
      </View>
      <View style={[styles.card, {backgroundColor: '#99cc00'}]}>
        <Icone name="message" size={38} color="#fff" />
        <View style={{paddingLeft: 10}}>
          <Text style={styles.textBold}>CHAT</Text>
          <Text style={styles.textSmall}>Check Your new messages</Text>
        </View>
      </View>
      <View style={[styles.card, {backgroundColor: '#4d79ff'}]}>
        <Iconm name="call" size={38} color="#fff" />
        <View style={{paddingLeft: 10}}>
          <Text style={styles.textBold}>CALL</Text>
          <Text style={styles.textSmall}>Check your missed calls</Text>
        </View>
      </View>
    </View>
  );
};;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2eb8b8',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    width: '90%',
    height: '13%',
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 20,
    elevation: 4,
    borderRadius: 4,
  },
  textBold: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  textSmall: {color: '#fff', fontSize: 12, fontWeight: 'bold'},
});

export default HomeScreen;
