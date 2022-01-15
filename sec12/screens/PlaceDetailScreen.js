import React from "react";
import { StyleSheet, View, Text } from "react-native";

const PlacesDetailScreen = () => {
  return (
    <View>
      <Text>PlacesDetailScreen</Text>
    </View>
  );
};

PlacesDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({});

export default PlacesDetailScreen;
