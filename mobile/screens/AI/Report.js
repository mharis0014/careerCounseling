import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LineChart} from 'react-native-chart-kit';
import Rep from '../../data/report';
import BigFive from '../../data/bigFive';
const Report = (props) => {
  const [personality, setPersonality] = useState('');
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState(false);
  const ansArr = props.route.params.ansArr;

  const linedata = {
    labels: ['O', 'E-I', 'N', 'A', 'C'],
    datasets: [
      {
        data: [
          personality.open,
          personality.extroversion,
          personality.neurotic,
          personality.agreeable,
          personality.conscientious,
        ],
        strokeWidth: 2,
      },
    ],
  };

  useEffect(() => {
    console.log(ansArr);
    sendCred();
  }, []);

  function sendCred() {
    fetch('http://10.0.2.2:5000', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: ansArr,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPersonality(data);
        setLoading(true);
      });
  }

  const career1 = () => {
    for (var i = 0; i < Rep.length; i++) {
      if (personality.cluster == Rep[i].index) {
        return (
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            {Rep[i].careers[0]}
          </Text>
        );
      }
    }
  };

  const career2 = () => {
    for (var i = 0; i < Rep.length; i++) {
      if (personality.cluster == Rep[i].index) {
        return (
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            {Rep[i].careers[1]}
          </Text>
        );
      }
    }
  };

  const career3 = () => {
    for (var i = 0; i < Rep.length; i++) {
      if (personality.cluster == Rep[i].index) {
        return (
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            {Rep[i].careers[2]}
          </Text>
        );
      }
    }
  };

  const description = () => {
    for (var i = 0; i < Rep.length; i++) {
      if (personality.cluster == Rep[i].index) {
        return (
          <Text style={{color: '#555', fontSize: 15, lineHeight: 20}}>
            {Rep[i].desc}
          </Text>
        );
      }
    }
  };

  const pills = () => {
    for (var i = 0; i < Rep.length; i++) {
      if (personality.cluster == Rep[i].index) {
        return (
          <>
            <View
              style={{
                marginTop: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f9ce69',
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}>
                <Text>{Rep[i].personalities[0]}</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#1f7396',
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}>
                <Text>{Rep[i].personalities[1]}</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#22aff1',
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}>
                <Text>{Rep[i].personalities[2]}</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#ff7c1f',
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}>
                <Text>{Rep[i].personalities[3]}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#db1b4b',
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}>
                <Text>{Rep[i].personalities[4]}</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#f8b53a',
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}>
                <Text>{Rep[i].personalities[5]}</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#3fc495',
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                  elevation: 5,
                }}>
                <Text>{Rep[i].personalities[6]}</Text>
              </View>
            </View>
          </>
        );
      }
    }
  };

  return loading ? (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text
            style={{paddingHorizontal: '6%', paddingTop: '6%', fontSize: 16}}>
            <Text style={{fontWeight: 'bold', color: '#888', fontSize: 18}}>
              Muhammad Haris
            </Text>
            , we are presenting you a brief summary of your ideal career test
            report.
          </Text>
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              margin: 20,
            }}>
            <Text style={{margin: 32, fontWeight: '700', fontSize: 20}}>
              Ideal Careers
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View>
                <Image
                  style={{width: 105, height: 105, marginTop: 20}}
                  source={require('../../assets/three.png')}
                />
                <View
                  style={{
                    backgroundColor: '#e86267',
                    paddingVertical: 15,
                    alignItems: 'center',
                    marginTop: -10,
                    elevation: 10,
                  }}>
                  {career1()}
                </View>
              </View>
              <View>
                <Image
                  style={{width: 105, height: 105}}
                  source={require('../../assets/one.png')}
                />
                <View
                  style={{
                    backgroundColor: '#4faec0',
                    paddingVertical: 25,
                    alignItems: 'center',
                    marginTop: -9.7,
                    elevation: 10,
                  }}>
                  {career2()}
                </View>
              </View>
              <View>
                <Image
                  style={{width: 105, height: 105, marginTop: 36}}
                  source={require('../../assets/work.png')}
                />
                <View
                  style={{
                    backgroundColor: '#19394b',
                    padding: 7,
                    alignItems: 'center',
                    marginTop: -10,
                    elevation: 10,
                  }}>
                  {career3()}
                </View>
              </View>
            </View>
            {pills()}
            <View style={{padding: 20}}>{description()}</View>
            <View style={{alignItems: 'center'}}>
              <LineChart
                data={linedata}
                width={330}
                height={220}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#000',
                  backgroundGradientTo: '#888',
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                style={{
                  borderRadius: 16,
                }}
              />
            </View>
            <View style={{margin: 10, marginTop: 25}}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{paddingRight: 5}}>
                  <Image
                    style={{width: 150, height: 105}}
                    source={require('../../assets/graph.png')}
                  />
                </View>
                <View>
                  <Text>
                    <Text style={{fontWeight: 'bold', color: '#888'}}>O</Text> -
                    Openness
                  </Text>
                  <Text>
                    <Text style={{fontWeight: 'bold', color: '#888'}}>C</Text> -
                    Conscientious
                  </Text>
                  <Text>
                    <Text style={{fontWeight: 'bold', color: '#888'}}>E-I</Text>{' '}
                    - Extraversion-Introversion
                  </Text>
                  <Text>
                    <Text style={{fontWeight: 'bold', color: '#888'}}>A</Text> -
                    Agreeableness
                  </Text>
                  <Text>
                    <Text style={{fontWeight: 'bold', color: '#888'}}>N</Text> -
                    Neuroticism
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  margin: 20,
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'blue'}}>
                  What is{' '}
                  <Text style={{fontWeight: 'bold', color: '#888'}}>
                    Big Five
                  </Text>{' '}
                  Personality Test?
                </Text>
                <Ionicons
                  onPress={() => setScroll(!scroll)}
                  name={scroll ? 'chevron-up' : 'chevron-down'}
                  size={25}
                  color="#000"
                />
              </View>
            </View>
            {scroll ? (
              <View style={{padding: 20}}>
                <Text style={{color: '#555', fontSize: 15, lineHeight: 20}}>
                  {BigFive.intro}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  ) : (
    <View style={[styles.activity, styles.horizontal]}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Report;
