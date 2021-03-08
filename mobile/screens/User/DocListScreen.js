import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class def extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayData: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({loading: true});
    fetch('http://10.0.2.2:3000/getData')
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
        onPress={() =>
          this.props.navigation.navigate('Profile Card', props.item)
        }
        style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <View style={{padding: 17}}>
            <Image
              style={{height: 60, width: 60, borderRadius: 30}}
              source={{
                uri: `data:image/jpg;base64,${props.item.imageData}`,
              }}
            />
          </View>
          <View style={{paddingTop: 20}}>
            <Text style={{fontSize: 15}}>name is {props.item.name}</Text>
            <Text style={{color: '#888', paddingTop: 10}}>
              35 Years Experience
            </Text>
          </View>
          <View style={{paddingTop: 20, paddingLeft: 40}}>
            <Text style={{color: '#888'}}>General Physicial</Text>
            <Text style={{paddingTop: 13, paddingLeft: 13, fontSize: 15}}>
              ⭐⭐⭐⭐⭐
            </Text>
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
