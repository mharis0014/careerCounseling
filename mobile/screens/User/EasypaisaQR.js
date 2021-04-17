import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const EasypaisaQR = (props) => {
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
      <View style={{ paddingTop: 30, flex: 3}}>
        <Image
          style={{height: 250, width: 250}}
          source={require('../../assets/qrcode.png')}
        />
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
