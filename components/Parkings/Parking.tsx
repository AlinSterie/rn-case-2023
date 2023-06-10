import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ParkingProps {
  name: string;
  availableCapacity: number;
}

const Parking = ({ name, availableCapacity }: ParkingProps) => {
  return (
    <View>
      <Text>Name: {name}</Text>
      <Text style={styles.margin}>Available Capacity: {availableCapacity}</Text>
    </View>
  );
};

export default Parking;

const styles = StyleSheet.create({
  margin: {
    marginTop: 5,
  },
});
