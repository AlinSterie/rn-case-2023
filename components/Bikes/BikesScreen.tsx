import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Button,
} from "react-native";
import Bike from "./Bike";
import * as Clipboard from "expo-clipboard";

interface BikeData {
  recordid: string;
  fields: {
    name: string;
    bikes_available: number;
    bikes_in_use: number;
  };
}

const BikesScreen = () => {
  const [bikesData, setBikesData] = useState<BikeData[]>([]);

  const refresh = async () => {
    try {
      const response1 = await fetch(
        "https://data.stad.gent/api/records/1.0/search/?dataset=blue-bike-deelfietsen-gent-dampoort&q=&facet=name"
      );
      const data1 = await response1.json();
      const bikesApi1 = data1.records || [];

      const response2 = await fetch(
        "https://data.stad.gent/api/records/1.0/search/?dataset=blue-bike-deelfietsen-gent-sint-pieters-m-hendrikaplein&q=&facet=name"
      );
      const data2 = await response2.json();
      const bikesApi2 = data2.records || [];

      const response3 = await fetch(
        "https://data.stad.gent/api/records/1.0/search/?dataset=blue-bike-deelfietsen-gent-sint-pieters-st-denijslaan&q=&facet=name"
      );
      const data3 = await response3.json();
      const bikesApi3 = data3.records || [];

      const combinedData = [...bikesApi1, ...bikesApi2, ...bikesApi3];

      setBikesData(combinedData);
    } catch (error) {
      console.error("Error fetching bike data:", error);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to clipboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "ios" && (
        <StatusBar barStyle="dark-content" backgroundColor="black" />
      )}
      {Platform.OS === "android" && <StatusBar backgroundColor="black" />}
      <Text style={styles.title}>
        BlueBike stations at Ghent Dampoort & Ghent Sint Pieters
      </Text>
      <FlatList
        data={bikesData}
        renderItem={({ item: bike }) => (
          <TouchableOpacity
            //onLongPress={() => handleCopyToClipboard(bike.fields.name)}
            onLongPress={() => copyToClipboard(bike.fields.name)}
          >
            <View style={styles.card}>
              <Bike
                name={bike.fields.name}
                availableBikes={bike.fields.bikes_available}
                maximumBikes={
                  bike.fields.bikes_in_use + bike.fields.bikes_available
                }
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(bike) => bike.recordid}
      />
      <Button title="Refresh" color="#fff" onPress={() => refresh()} />
    </SafeAreaView>
  );
};

export default BikesScreen;

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
