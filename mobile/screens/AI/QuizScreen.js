import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';

import Quiz from './Quiz';

export default class QuizScreen extends Component {
  state = {
    isVisible: false,
  };

  renderComponents = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isVisible ? (
          <Quiz navigation={this.props.navigation} />
        ) : (
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
              <ImageBackground
                source={require('../../assets/header.png')}
                style={styles.imageBackground}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
                  Welcome to AI Career Test
                </Text>
                <Text
                  style={{
                    color: 'white',
                    marginTop: 20,
                    padding: 10,
                  }}>
                  <Text
                    style={{fontWeight: 'bold', color: 'red', fontSize: 18}}>
                    Instructions:
                  </Text>
                  Answer all 50 questions as they relate to you in a fulfilling
                  environment. There are no wrong answers. If you are undecided,
                  choose the answer that describes you more often
                </Text>
                <Text style={{color: 'yellow'}}>Click Start to continue</Text>
              </ImageBackground>
            </View>
            <View style={styles.footer}>
              <View style={styles.buttonContainer}>
                <Image
                  style={{width: 350, height: 270}}
                  source={require('../../assets/quiz.png')}
                />
                <Button
                  onPress={this.renderComponents}
                  title="Take Test!"
                  color="#93278f"
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    padding: 20,
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
