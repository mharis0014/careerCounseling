import React from 'react';
import {View, Text, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    title: 'CONNECT WITH YOUR EXPERT',
    text:
      'Chat anonymously with an expert who is here to help you and not judge you',
    image: require('../assets/1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'DISCUSS YOUR CONCERNS',
    text:
      'Open up to your expert in a space where you get the guidance you need, and your concerns get the attention they deserve',
    image: require('../assets/2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'UNLEASH A BETTER YOU',
    text:
      'with 24X7 support from our expert, bid goodbye to your oldself and be on your way to becoming a better you',
    image: require('../assets/3.jpg'),
    backgroundColor: '#22bcb5',
  },
];

export default class WelcomeScreen extends React.Component {
  _renderItem = ({item}) => {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
          source={item.image}
          style={{
            resizeMode: 'cover',
            height: '73%',
            width: '100%',
          }}
        />
        <Text
          style={{
            paddingTop: 25,
            paddingBottom: 10,
            fontSize: 23,
            fontWeight: 'bold',
            color: '#21465b',
            alignSelf: 'center',
          }}>
          {item.title}
        </Text>

        <Text
          style={{
            textAlign: 'center',
            color: '#b5b5b5',
            fontSize: 15,
            paddingHorizontal: 30,
          }}>
          {item.text}
        </Text>
      </View>
    );
  };

  _onDone = () => {
    this.props.navigation.navigate('SelectUser Screen');
  };

  render() {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        data={slides}
        onDone={this._onDone}
        keyExtractor={(item) => item.key.toString()}
        activeDotStyle={{
          backgroundColor: '#21465b',
          width: 30,
        }}
      />
    );
  }
}
