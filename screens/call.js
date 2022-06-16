import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStylesheet } from '../assets/globalStylesheet'

export default function Call({ navigation }) {
  return (
    <View style={globalStylesheet.container}>
      <Text>{ navigation.selectedDevice }</Text>
    </View>
  );
}

