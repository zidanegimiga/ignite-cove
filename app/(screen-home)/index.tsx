import { StyleSheet, ScrollView } from "react-native";

import { SafeAreaThemedView, ThemedView } from "@/components/ThemedView";
import Header from "@/components/features/Home/Header";
import ProfileCard from "@/components/features/Home/ProfileCard";
import ProfileInfo from "@/components/features/Home/ProfileInfo";


export default function HomeScreen() {
  return (
    <SafeAreaThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <Header />
      </ThemedView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileCard
          imageUrl="https://placekitten.com/500/700"
          name="Paul"
          age={35}
          location="Kilimani, 2km away"
          phoneNumber="071* *** *90"
          origin="Germany"
          onReject={() => alert("Rejected")}
          onLike={() => alert("Liked")}
          onViewNumber={() => alert("View Number")}
        />
        <ProfileInfo/>
      </ScrollView>
    </SafeAreaThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: "#FFF",
    zIndex: 1000,
    padding: 16,
    paddingTop: 32
  },
  scrollContent: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
});
