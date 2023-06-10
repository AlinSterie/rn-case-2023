import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Parking from "./Parking";

interface ParkingData {
  fields: {
    name: string;
    availablecapacity: number;
    totalcapacity: number;
    location: [number, number];
  };
}

const ParkingsScreen = () => {
  const [parkingData, setParkingData] = useState<ParkingData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://data.stad.gent/api/records/1.0/search/?dataset=bezetting-parkeergarages-real-time&q=&facet=name&facet=lastupdate&facet=description&facet=categorie"
        );
        const data = await response.json();
        const parkingsApi = data.records || [];

        setParkingData(parkingsApi);
      } catch (error) {
        console.error("Error fetching parking data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredParkings = parkingData
    .filter(
      (parking) =>
        (parking.fields.availablecapacity / parking.fields.totalcapacity) *
          100 >=
        50
    )
    .sort((a, b) => b.fields.availablecapacity - a.fields.availablecapacity);

  const openGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.openURL(url).catch((error) =>
      console.error("Error opening Google Maps:", error)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "ios" && (
        <StatusBar barStyle="dark-content" backgroundColor="black" />
      )}
      {Platform.OS === "android" && <StatusBar backgroundColor="black" />}
      <Text style={styles.title}>
        All public parkings in Ghent with a capacity of 50% or more available
      </Text>
      <FlatList
        data={filteredParkings}
        renderItem={({ item: parking }) => (
          <TouchableOpacity
            onPress={() =>
              openGoogleMaps(
                parking.fields.location[0],
                parking.fields.location[1]
              )
            }
          >
            <View style={styles.card}>
              <Parking
                name={parking.fields.name}
                availableCapacity={parking.fields.availablecapacity}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ParkingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    margin: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  card: {
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 5,
    elevation: 2,
  },
});
