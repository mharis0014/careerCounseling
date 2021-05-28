import React from 'react';
import { View, Text } from 'react-native';

const StatusPill = (props) => {
    return (
      <View
        style={{
          backgroundColor: props.bgcolor,
          borderRadius: 5,
          padding: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 12}}>{props.status}</Text>
      </View>
    );
}

export default StatusPill;