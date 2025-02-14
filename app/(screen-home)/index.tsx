import { StyleSheet, ScrollView, FlatList } from "react-native";

import { SafeAreaThemedView, ThemedView } from "@/components/ThemedView";
import Header from "@/components/features/Home/Header";
import ProfileCard from "@/components/features/Home/ProfileCard";
import ProfileInfo from "@/components/features/Home/ProfileInfo";
import { useEffect, useState } from "react";
import { loadProfileData } from "@/utilities/profileDataStorage";


export default function HomeScreen() {
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    loadProfilePhoto();
    const storedProfile = loadProfileData();
    console.log("Stored: ", storedProfile);
  }, []);

  const loadProfilePhoto = async () => {
    try {
      const storedProfile = await loadProfileData();
      setUserProfile(storedProfile);
      console.log("Loaded Profile : ", storedProfile);

      if (storedProfile?.profile_photo) {
        setImage(storedProfile.profile_photo);
      }
    } catch (e) {
      console.error("Error loading profile photo:", e);
    }
  };

  const data = [
    {
      type: 'profileCard',
      content: {
        imageUrl: image,
        name: `${userProfile?.firstName} ${userProfile?.lastName}`,
        age: userProfile?.age,
        location: userProfile?.stringLocation,
        phoneNumber: "071* *** *90",
        origin: "Germany",
        onReject: () => alert("Rejected"),
        onLike: () => alert("Liked"),
        onViewNumber: () => alert("View Number"),
      }
    },
    { type: 'profileInfo' },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'profileCard':
        return <ProfileCard {...item.content} />;
      case 'profileInfo':
        return <ProfileInfo />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <Header />
      </ThemedView>

      {/* <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileCard
          imageUrl={image}
          name={`${userProfile?.firstName}` + ' ' + `${userProfile?.lastName} `}
          age={userProfile?.age}
          location={userProfile?.stringLocation}
          phoneNumber="071* *** *90"
          origin="Germany"
          onReject={() => alert("Rejected")}
          onLike={() => alert("Liked")}
          onViewNumber={() => alert("View Number")}
        />
        <ProfileInfo/>
      </ScrollView> */}

<FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContent}
      />
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
