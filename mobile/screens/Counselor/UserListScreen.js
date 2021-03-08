import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayData: [],
      loading: true,
    };
  }

  usersOnline = (state) => ({
    state: state.usersOnline,
  });

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({loading: true});
    fetch('http://10.0.2.2:3000/getUserData')
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({arrayData: resJson});
        this.setState({loading: false});
      })
      .catch((e) => console.log(e));
  }

  docListCompoment = (props) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Friend Screen')}
        style={styles.card}>
        <View style={{paddingTop: 20}}>
          <Text style={{fontSize: 15}}>name is {props.item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  handleRefresh = () => {
    this.setState({loading: false}, () => {
      this.fetchData();
    });
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
        data={this.state.arrayData}
        renderItem={(item) => this.docListCompoment(item)}
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
