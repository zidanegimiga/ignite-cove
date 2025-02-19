import { StyleSheet, Image, Platform, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, Dimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import ProfileHeader from "@/components/features/Profile/ProfileHeader";
import AnalyticsCard from "@/components/features/Profile/AnalyticsCard";
import NormalDetailsCard from "@/components/features/Profile/NormalDetailsCard";
import Location from "@/components/shared/Icons/Location";
import ExpandableCard from "@/components/features/Profile/ExpandableCard";
import PhotoAlbumCard from "@/components/features/Profile/PhotAlbum";
import VerificationBanner from "@/components/features/Profile/VerificationBanner";
import { useState, useEffect } from "react";
import { loadProfileData } from "@/utilities/profileDataStorage";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Profile() {
  const [loaded, error] = useFonts({
    'Oswald-Bold': require('@/assets/fonts/oswald/Oswald-Bold.ttf'),
    'Oswald-Regular': require('@/assets/fonts/oswald/Oswald-Regular.ttf'),
    'Oswald-SemiBold': require('@/assets/fonts/oswald/Oswald-SemiBold.ttf'),
    'Oswald-Light': require('@/assets/fonts/oswald/Oswald-Light.ttf'),
  });

  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    loadProfilePhoto();
    const storedProfile = loadProfileData();
  }, []);

  const loadProfilePhoto = async () => {
    try {
      const storedProfile = await loadProfileData();
      setUserProfile(storedProfile);

      if (storedProfile?.imageURL) {
        setImage(storedProfile.imageURL);
      }
    } catch (e) {
      console.error("Error loading profile photo:", e);
    }
  };

  const profileSections = [
    { id: "1", component: <AnalyticsCard views={156} likes={156} /> },
    { id: "1b", component: <VerificationBanner onPress={() => console.log("Verification Clicked!")} /> },
    {
      id: "2",
      component: (
        <NormalDetailsCard
          title="You're"
          type="personality"
          icon={
            <Image
              source={image}
              style={{ width: 24, height: 24 }}
            />
          }
          dropdownItems={["Adventurous", "Calm", "Outgoing", "Reserved"]}
        />
      ),
    },
    {
      id: "3",
      component: (
        <NormalDetailsCard
          title="Location"
          type="location"
          icon={<Location />}
          dropdownItems={[
            "New York",
            "Los Angeles",
            "Nairobi",
            "Paris",
            "London",
            "Tokyo",
            "Berlin",
          ]}
        />
      ),
    },
    {
      id: "4",
      component: (
        <ExpandableCard
          title="Appearance"
          details={[
            { label: "Fitness Level", value: "Active Lifestyle" },
            { label: "Dietary Preference", value: "Omnivore" },
            { label: "Smoking", value: "Never" },
            { label: "Hair Color", value: "Black" },
          ]}
        />
      ),
    },
    {
      id: "5",
      component: (
        <ExpandableCard
          title="Lifestyle Habits"
          details={[
            { label: "Height", value: "150cm" },
            { label: "Body Type", value: "Petite" },
            { label: "Eye Color", value: "Brown" },
            { label: "Pets", value: "Don’t have but would love to" },
            { label: "Drinking", value: "Occasionally" }
          ]}
        />
      ),
    },
    {
      id: "6",
      component: (
        <ExpandableCard
          title="Cultural, Social & Education Background"
          details={[
            { label: "Ethnicity", value: "African" },
            { label: "Religion", value: "Christianity" },
            { label: "Education Level", value: "Masters" },
            { label: "Occupation", value: "Software Engineer" },
            { label: "Industry", value: "Technology" }
          ]}
        />
      ),
    },
    { 
      id: "7", 
      component: (
        <PhotoAlbumCard
          title="Photo Album"
          initialPhotos={[
            image
          ]}
        />
      )
    },
  ];

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ThemedText style={{fontFamily: 'Oswald-Regular', marginLeft: 16, marginVertical: 16}}>Profile</ThemedText>
        <View style={{padding: 16}}>
        <ProfileHeader name={`${userProfile?.firstName}` + ' ' + `${userProfile?.lastName}`} age={userProfile?.age} image_url={image} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={profileSections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.fullWidthItem}>{item.component}</View>
            )}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    // paddingTop: 16,
    // paddingHorizontal: 24,
  },
  contentContainer: {
    width: "100%",
    paddingBottom: 160,
  },
  fullWidthItem: {
    // width: SCREEN_WIDTH - 48,
    width: "100%",
    paddingHorizontal: 8,
    marginVertical: 4,
    alignSelf: "center",
  },
  title: {
    fontFamily: "Oswald-Regular",
    fontSize: 16,
    marginBottom: 16,
  },
});
