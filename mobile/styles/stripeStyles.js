import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Colors from './assets/colors/Colors';
const Styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff', //Colors.color_white,
    paddingBottom: 10,
  },
  // divider: {
  //   height: 32,
  //   width: '100%',
  //   marginBottom: 20,
  //   backgroundColor: '#' //Colors.color_border,
  // },
  // amount_container: {height: hp('32%')},
  card_container: {
    height: hp('50%'),
    paddingTop: 100
  },
  add_credit_button: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 30,
  },
  // heading_text: {
  //   marginLeft: 20,
  //   fontFamily: 'Montserrat-SemiBold',
  //   color: Colors.color_primary,
  //   fontSize: 14,
  //   marginBottom: 10,
  // },
  flatlist_container: {
    width: wp('72%'),
    alignSelf: 'center',
  },
  amounts_flatlist_container: {
    alignSelf: 'center',
  },
  // amount: {
  //   height: 36,
  //   width: wp('20%'),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   margin: 10,
  //   backgroundColor: Colors.color_border,
  //   borderRadius: 6,
  //   shadowColor: Colors.color_border,
  //   shadowOffset: {width: 1, height: 1},
  //   shadowOpacity: 1,
  //   elevation: 2,
  // },
  // amount_text: {
  //   fontFamily: 'Montserrat-Medium',
  //   fontSize: 12,
  //   color: Colors.color_splitter,
  // },
  // text_field_container: {
  //   height: 30,
  //   width: '65%',
  //   alignSelf: 'center',
  //   backgroundColor: Colors.color_border,
  //   borderRadius: 6,
  //   shadowColor: Colors.color_border,
  //   shadowOffset: {width: 1, height: 1},
  //   shadowOpacity: 1,
  //   elevation: 2,
  //   justifyContent: 'center',
  //   marginTop: 10,
  // },
  textfield: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default Styles;
