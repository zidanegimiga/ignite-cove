import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import React from "react";

const BottomTabProfileItem = ({ source }: { source: string }) => {
  return (
    <View style={styles.container}>
      {!source || source.length === 0 ? (
        <View style={{ width: 24, height: 24, backgroundColor: "grey" }}></View>
      ) : (
        <Image
          source={source}
          shouldRasterizeIOS={true}
          style={{ width: 24, height: 24, borderRadius: 12 }}
        />
      )}
    </View>
  );
};

export default BottomTabProfileItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    width: 24,
    height: 24,
  },
});
