import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const LoadingScreen = (props) => {
  const detectLogin = async (props) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      props.navigation.replace('Homes');
    } else {
      props.navigation.replace('Login');
    }
  };

  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;
