import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Weather({ temp, address }) {
  console.log("address", address);
  return (
    <View style={styles.container}>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.temp}>{temp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    width: 300,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  temp: {
    fontSize: 30,
  },
});
