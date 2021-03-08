import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ProfileCardScreen = (props) => {
  const [isVisible, setVisible] = useState(false);

  const usersOnline = useSelector((state) => state.usersOnline);
  const name1 = props.route.params.name;
  const id1 = props.route.params.id;
  const email1 = props.route.params.email;
  const img1 = props.route.params.imageData;

  const showPicker = () => {
    setVisible(true);
  };

  const hidePicker = () => {
    setVisible(false);
  };

  const handlePicker = (date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Image
        style={{height: 260, width: '100%'}}
        source={{
          uri: `data:image/jpg;base64,${img1}`,
        }}
      />
      <View style={styles.btnContainer}>
        <View style={[styles.customBtn, {backgroundColor: '#eda1bf'}]}>
          <Icon name="phone" size={16} color="#fff" />
          <Text style={styles.btntxt}>Voice Call</Text>
        </View>
        <View style={[styles.customBtn, {backgroundColor: '#00BCD4'}]}>
          <Icon name="video-camera" size={16} color="#fff" />
          <Text style={styles.btntxt}>Video Call</Text>
        </View>
        <FlatList
          data={usersOnline}
          renderItem={({item}) => {
            if (item.username != global.c_user) {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Chat', {
                      name: item.username,
                      userId: item.userId,
                    })
                  }>
                  <View
                    style={{
                      backgroundColor: '#fb9e93',
                      flexDirection: 'row',
                      paddingLeft: 38,
                      paddingVertical: 10,
                      marginHorizontal: 4,
                      borderRadius: 7,
                      elevation: 2,
                    }}>
                    <Icone name="new-message" size={16} color="#fff" />
                    <Text style={styles.btntxt}>Message</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item) => item.userId}
        />
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('Friend Screen')}
          style={[styles.customBtn, {backgroundColor: '#fb9e93'}]}>
          <Icone name="new-message" size={16} color="#fff" />
          <Text style={styles.btntxt}>Message</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{marginLeft: 37, marginVertical: 5}}>
        <Text style={{fontWeight: 'bold', paddingVertical: 5, fontSize: 16}}>
          {name1}
        </Text>
        <Text style={{fontSize: 13}}> MBBS, FCPS</Text>
        <Text style={{fontSize: 12, paddingVertical: 5}}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
      </View>
      <View style={{marginHorizontal: 37}}>
        <Text style={{fontWeight: 'bold', marginTop: 15, marginBottom: 5}}>
          About Serena
        </Text>
        <Text style={{fontSize: 12, lineHeight: 20}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </Text>
      </View>
      <View style={styles.review}>
        <View>
          <Text style={{fontSize: 11}}>Patients</Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>1.08K</Text>
        </View>
        <View>
          <Text style={{fontSize: 11}}>Experience</Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>8 Years</Text>
        </View>
        <View>
          <Text style={{fontSize: 11}}>Review</Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>2.05K</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}} style={styles.btn}>
        onPress={showPicker}
        <Text style={{alignSelf: 'center', color: '#fff'}}>
          Book an Appointment
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isVisible}
        mode="datetime"
        onConfirm={handlePicker}
        onCancel={hidePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'center',
  },
  customBtn: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 7,
    elevation: 2,
  },
  btntxt: {fontSize: 11, paddingLeft: 8, color: '#fff'},
  review: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 37,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 8,
    backgroundColor: '#64e764',
    padding: 14,
    marginHorizontal: 38,
  },
});

export default ProfileCardScreen;
