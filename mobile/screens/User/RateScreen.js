import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-community/async-storage';

const RateScreen = (props) => {
  const [feedback, setFeedback] = useState('');
  const [ratingIndex, setRatingIndex] = useState(0);
  const [userId, setUserid] = useState('');
  const [userName, setUsername] = useState('');
  const [userEmail, setUseremail] = useState('');

  const counselorId = props.route.params.id;

  const confirmRating = async (props) => {
    try {
      const response = await fetch(
        'http://10.0.2.2:3001/ratings/' + counselorId,
        {
          Accept: 'application/json',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ratingIndex: ratingIndex,
            feedback: feedback,
            userName: userName,
          }),
        },
      );
      const resp = await response.json();
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const test = async (text) => {
    await setFeedback(text);
    console.log(feedback);
  };

  const getUserDate = async () => {
    const afterParse = JSON.parse(await AsyncStorage.getItem('item'));
    setUserid(afterParse.userId);
    setUsername(afterParse.userName);
    setUseremail(afterParse.userEmail);
  };

  const ratingCompleted = (rating) => {
    setRatingIndex(rating);
    getUserDate();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <AirbnbRating
            count={5}
            reviews={['Terrible', 'Bad', 'Good', 'Excellent', 'Unbelievable']}
            defaultRating={1}
            size={20}
            onFinishRating={ratingCompleted}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => test(text)}
            maxLength={500}
            multiline={true}
            placeholderTextColor="#64e764"
            value={feedback}
            placeholder="Describe your experience (optional)"
          />
          <TouchableOpacity onPress={() => confirmRating()} style={styles.btn}>
            <Text style={{alignSelf: 'center', color: '#fff'}}>POST</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    width: '100%',
    height: '100%',
  },
  card: {
    marginTop: 200,
    width: '95%',
    height: 205,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#64e764',
    color: '#000',
  },
  btn: {
    backgroundColor: '#64e764',
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 10,
  },
});

export default RateScreen;
