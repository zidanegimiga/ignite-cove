import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesome5 } from "@expo/vector-icons";

interface BasicInfoItem {
  id: string;
  icon: string;
  text: string;
}


interface EthnicityCardProps {
  data: string[];
  title: string;
}

const bioText = "Lifetime maybe"

const basicInfoData: BasicInfoItem[] = [
  { id: "1", icon: "male", text: "186cm" },
  { id: "2", icon: "running", text: "Athletic" },
  { id: "3", icon: "eye", text: "Green" },
  { id: "4", icon: "tint", text: "Brown" },
  { id: "5", icon: "graduation-cap", text: "Masters" },
  { id: "6", icon: "eye", text: "Green" },
];

const EthnicityCard: React.FC<EthnicityCardProps> = ({ title, data }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.ethnicityContainer}>
          {data.map((data, index) => (
            <View key={index} style={styles.ethnicty_pill}>
              <Text style={styles.text}>{data}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

const ProfileInfo = () => {
  return (
    <View style={styles.section_container}>
      {/* <ThemedView style={{ width: "100%" }}>
        <ThemedText>Bio</ThemedText>
        <ThemedText>Lifetime maybe</ThemedText>
      </ThemedView> */}
      <View style={styles.container}>
        <Text style={styles.title}>Bio</Text>
        <Text style={styles.bioText}>{bioText}</Text>
      </View>
      <ThemedView style={styles.container}>
        <Text style={styles.title}>Basics</Text>
        <FlatList
          data={basicInfoData}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.pill}>
              <FontAwesome5 name={item.icon} size={16} color="red" />
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
        />
      </ThemedView>
      <ThemedView style={styles.container}>
        <EthnicityCard data={["African"]} title={"Ethnicities"} />
      </ThemedView>
      <ThemedView style={styles.container}>
        <EthnicityCard data={["English", "French"]} title={"Languages"} />
      </ThemedView>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  section_container: {
    flexDirection: "column",
    gap: 16,
    marginTop: 48
  },
  container: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontFamily: "Oswald-Regular",
    marginBottom: 12,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  text: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: "Oswald-Light",
    color: "black",
  },
  bioText: {
    fontSize: 14,
    fontFamily: "Oswald-Light",
    color: "black",
  },
  ethnicty_pill: {
    backgroundColor: "#FFF5F5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginTop: 4,
  },
  ethnicityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
