import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';

const ProfileCardScreen = (props) => {
  const [isVisible, setVisible] = useState(false);

  const usersOnline = useSelector((state) => state.usersOnline);
  const name1 = props.route.params.name;
  const email1 = props.route.params.email;
  const img1 = props.route.params.imageData;
  const id = props.route.params.id;
  
  const showPicker = () => {
    setVisible(true);
  };

  const hidePicker = () => {
    setVisible(false);
  };

  const handlePicker = (date) => {
    props.navigation.navigate('Pricing Screen', {
      counselorImage: img1,
      counselorId: id,
      counselorName: name1,
      counselorEmail: email1,
      date: date.toString(),
    });
    hidePicker();
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
        <TouchableOpacity
          style={[styles.customBtn, {backgroundColor: '#eda1bf'}]}>
          <Icon name="phone" size={16} color="#fff" />
          <Text style={styles.btntxt}>Voice Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('Consoler type is ' + props.route.params.type);

            if (props.route.params.type === 'counsoler') {
              fetch('http://10.0.2.2:3001/getallusers_videoid')
                .then((res) => res.json())
                .then((resJson) => {
                  console.log(
                    'Get all users is ' + props.route.params.name.substr(2),
                  );
                  for (var i = 0; i < resJson.length; ++i) {
                    if (resJson[i].email == props.route.params.name.substr(2)) {
                      global.sessionid = '' + resJson[i].sessionId;
                      global.tokenid = '' + resJson[i].tokenid;
                    }
                  }
                  console.log('Session id is ' + global.sessionid);
                  props.navigation.navigate('Videochat');
                })
                .catch((e) => console.log(e));
            } else {
              console.log('Session id is ' + global.sessionid);
              props.navigation.navigate('Videochat');
            }
          }}
          style={[styles.customBtn, {backgroundColor: '#00BCD4'}]}>
          <Icon name="video-camera" size={16} color="#fff" />
          <Text style={styles.btntxt}>Video Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const allusers = JSON.parse(JSON.stringify(usersOnline));
            global.consolerchatid = '1234';
            for (var i = 0; i < allusers.length; ++i) {
              console.log('allusers ' + allusers[i].username);
              console.log('users ' + email1);

              if (
                'c_' + email1.toLowerCase().trim() ===
                allusers[i].username.toLowerCase().trim()
              ) {
                global.consolerchatid = allusers[i].userId;
              }
            }
            console.log('Chat id is: ' + global.consolerchatid);
            props.navigation.navigate('Chat Screen', {
              img: img1,
              name: name1,
              counselorId: id,
              userId: global.consolerchatid,
            });
          }}
          style={[styles.customBtn, {backgroundColor: '#fb9e93'}]}>
          <Icone name="new-message" size={16} color="#fff" />
          <Text style={styles.btntxt}>Message</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: 37, marginVertical: 5}}>
        <Text style={{fontWeight: 'bold', paddingVertical: 5, fontSize: 16}}>
          {name1}
        </Text>
        <Text style={{fontSize: 13}}> MBBS, FCPS</Text>
        <Text style={{fontSize: 13, paddingVertical: 5}}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
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
      <TouchableOpacity onPress={showPicker} style={styles.btn}>
        <Text style={{alignSelf: 'center', color: '#fff'}}>
          Book an Appointment
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isVisible}
        mode="datetime"
        onConfirm={handlePicker}
        onCancel={hidePicker}
        v
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
    padding: 14,
    marginHorizontal: 38,
    backgroundColor: '#64e764',
  },
});

export default ProfileCardScreen;
