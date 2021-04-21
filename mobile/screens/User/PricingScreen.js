import React from 'react';
import {ScrollView} from 'react-native';
import {PricingCard} from 'react-native-elements';

const PricingScreen = (props) => {
  return (
    <>
      <ScrollView>
        <PricingCard
          color="#4f9deb"
          title="Basic"
          price="$6.99"
          onButtonPress={() => props.navigation.navigate('Payment Opt Screen')}
          info={[
            'valid for 1 day',
            'Unlimited Text Chat',
            'anytime in working hours',
          ]}
          button={{title: 'GET STARTED'}}
        />
        <PricingCard
          color="#FF6161"
          title="Standard"
          price="$14.99"
          onButtonPress={() => props.navigation.navigate('Payment Opt Screen')}
          info={[
            'valid for 1 hour',
            'Video Call',
            'Audio Call',
            'Text Chat',
            '1 session/day',
          ]}
          button={{title: 'GET STARTED'}}
        />
        <PricingCard
          color="#99cc00"
          title="Premium"
          price="$29.99"
          onButtonPress={() => props.navigation.navigate('Payment Opt Screen')}
          info={[
            'valid for 7 days',
            'Video Call',
            'Audio Call',
            'Text Chatg',
            '3 sessions/week',
          ]}
          button={{title: 'GET STARTED'}}
        />
      </ScrollView>
    </>
  );
};

export default PricingScreen;
