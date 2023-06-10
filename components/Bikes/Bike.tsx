import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BikeProps {
  name: string;
  availableBikes: number;
  maximumBikes: number;
}

const Bike = ({ name, availableBikes, maximumBikes }: BikeProps) => {
  return (
    <View>
      <Text>Name: {name}</Text>
      <Text style={styles.margin}>Bikes Available: {availableBikes}</Text>
      <Text style={styles.margin}>Maximum Bikes: {maximumBikes}</Text>
    </View>
  );
};

export default Bike;

const styles = StyleSheet.create({
  margin: {
    marginTop: 5,
  },
});
