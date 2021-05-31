import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import StatusPill from '../../components/StatusPill';

export default class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayData: [],
      bgColor: ['#3fc495', '#3664d4', '#f6c90e', 'red'],
      loading: true,
    };
  }

  getUserData = async () => {
    const afterParse = JSON.parse(await AsyncStorage.getItem('item'));
    const userId = afterParse.userId;
    this.fetchData(userId);
  };
  componentDidMount() {
    this.getUserData();
  }

  fetchData(userId) {
    this.setState({loading: true});
    fetch('http://10.0.2.2:3001/getUserAppointments/' + userId)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson[0].status);
        this.setState({arrayData: resJson});
        this.setState({loading: false});
      })
      .catch((e) => console.log(e));
  }

  appointmentListComp = (props) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Profile Card', props.item)
        }
        style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <View style={{padding: 17}}>
            <Image
              style={{height: 60, width: 60, borderRadius: 30}}
              source={{
                uri: `data:image/jpg;base64,${props.item.counselorImage}`,
              }}
            />
          </View>
          <View style={{paddingTop: 13}}>
            <Text style={{fontSize: 15}}>{props.item.counselorName}</Text>
            <Text style={{color: 'blue', paddingTop: 3}}>
              {props.item.counselorEmail}
            </Text>
          </View>
          <View style={{paddingTop: 17, paddingLeft: 60}}>
            <StatusPill
              status={props.item.status}
              bgcolor={this.state.bgColor[Math.floor(Math.random() * 4)]}
            />

            <Text style={{color: '#888'}}>Starting in</Text>
            <Text style={{fontSize: 15}}>01:25:46</Text>
          </View>
          <View style={{paddingTop: 33, paddingLeft: 15}}>
            <Ionicons name="chevron-forward" size={26} color="#c2c2c2" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  handleRefresh = () => {
    this.setState({loading: false}, () => {
      this.fetchData();
    });
  };

  header = () => {
    return (
      <Header
        backgroundColor="#FF6161"
        placement="center"
        leftComponent={
          <>
            <Ionicons
              style={{color: '#fff'}}
              name={'chevron-back'}
              size={25}
              color={'white'}
            />
          </>
        }
        centerComponent={{
          text: 'Appointments',
          style: {color: '#fff', fontSize: 18},
        }}
        rightComponent={
          <>
            <AntDesign
              style={{marginLeft: 15, color: '#fff'}}
              name={'user'}
              size={25}
              color={'white'}
            />
          </>
        }
      />
    );
  };

  renderSeparator = () => (
    <View
      style={{
        marginBottom: -20,
      }}
    />
  );

  render() {
    return (
      <FlatList
        ListHeaderComponent={() => this.header()}
        data={this.state.arrayData}
        renderItem={(item) => this.appointmentListComp(item)}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={(item) => item.id}
        refreshing={this.state.loading}
        onRefresh={this.handleRefresh}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    width: '100%',
    height: '100%',
  },
  card: {
    width: '95%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    margin: 10,
  },
});
