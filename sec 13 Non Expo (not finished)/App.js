/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const App = () => {
  const pickImage = () => {
    const options = {};
  };
  return (
    <View>
      <Button title="Take Image" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
