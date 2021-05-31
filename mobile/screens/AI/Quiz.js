import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  Image,
  ImageBackground,
  Button
} from 'react-native';

import {ProgressBar} from '@react-native-community/progress-bar-android';
import {Icon} from 'react-native-elements';

import Questions from '../../data/questions';
import Answers from '../../data/answers';

const Quiz = (props) => {
  const [q_no, setq_no] = useState(0);
  const [quizScreen, setQuizScreen] = useState(true);
  const [getDisabled, setDislabled] = useState(true);
  const [ansArray, setAnsArray] = useState([]);

  const renderItem = ({item}) => (
    <Item label={item.label} name={item.name} option={item.option} />
  );

  const mcqSelect = (label) => {
    if (q_no + 1 >= 50) {
      setDislabled(false);
    } else {
      setq_no(q_no + 1);
    }
    setAnsArray((prev) => [...prev, label]);
  };

  const Item = ({option, name, label}) => (
    <TouchableOpacity onPress={() => mcqSelect(label)} style={styles.answers}>
      <Text style={styles.answerText}>{name + ')  ' + option}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      {quizScreen ? (
        <View style={styles.screen}>
          <View style={styles.header}>
            <Text style={{paddingBottom: 5}}>Question: {q_no + 1}/50</Text>
          <ProgressBar
            styleAttr="Horizontal"
            indeterminate={false}
            progress={(q_no + 1) / 50}
          />
          </View>
          <View style={styles.mcqContainer}>
            <View style={styles.question}>
              <Text style={styles.questionText}>{Questions[q_no]}</Text>
            </View>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={Answers}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
              />
            </SafeAreaView>
          </View>
          <View style={styles.buttonContainer}>
            <Icon
              disabled={getDisabled}
              reverse
              name={'navigate-next'}
              type="material"
              color="#64e764"
              onPress={() => setQuizScreen(false)}
            />
          </View>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <StatusBar barStyle="light-content" />
          <View style={styles.resultHeader}>
            <ImageBackground
              source={require('../../assets/header.png')}
              style={styles.imageBackground}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
                {'  '}Congratulations 🎉
              </Text>
              <Text style={{color: 'yellow'}}>
                Click button to See Full Summary Report of your career!
              </Text>
              <View style={{marginTop: 40}}>
                <Button
                  onPress={() =>
                    props.navigation.navigate('Report Screen', {
                      ansArr: ansArray,
                    })
                  }
                  title="See Report!"
                  color="#c935c3"
                />
              </View>
            </ImageBackground>
          </View>
          <View style={styles.resultFooter}>
            <View style={styles.resultBtnContainer}>
              <Image
                style={{width: 380, height: 380}}
                source={require('../../assets/careerprogresspng.png')}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginLeft: 40,
  },
  screen: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    padding: 15,
    marginTop: 0,
  },
  mcqContainer: {
    flex: 7,
    alignItems: 'center',
  },
  question: {
    width: '80%',
    paddingBottom: 20,
  },
  answers: {
    width: '80%',
    padding: 15,
    backgroundColor: '#93278f',
    marginLeft: 17,
    marginVertical: 10,
    borderRadius: 30,
  },
  questionText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#777',
  },
  answerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginLeft: '65%',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  resultHeader: {
    flex: 1,
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  resultFooter: {
    flex: 1,
    padding: 20,
  },
  resultBtnContainer: {
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Quiz;
