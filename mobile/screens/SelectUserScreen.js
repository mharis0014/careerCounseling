import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const selectUserScreen = ({navigation}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('User Stack')}>
        <Image
          style={{height: 210, width: 210, borderRadius: 110}}
          source={require('../assets/userIcon.png')}
        />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Counselor Stack')}>
        <Image
          style={{height: 210, width: 210}}
          source={require('../assets/counselorIcon.png')}
        />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Counselor</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default selectUserScreen;
