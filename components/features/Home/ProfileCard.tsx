import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Image } from "expo-image";
import { Feather, FontAwesome } from "@expo/vector-icons";
import TimesIcon from "@/components/shared/Icons/Times";
import VerifiedCheckmark from "@/components/shared/Icons/verified";
import PhoneNumberModal from "./PhoneNumberModal";

interface ProfileCardProps {
  imageUrl: string;
  name: string;
  age: number;
  location: string;
  phoneNumber: string;
  origin: string;
  onReject: () => void;
  onLike: () => void;
  onViewNumber: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  imageUrl,
  name,
  age,
  location,
  phoneNumber,
  origin,
  onReject,
  onLike,
  onViewNumber,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(true);
  const [liked, setLiked] = React.useState(false);

  const handleReject = () => {
    ToastAndroid.show("Profile rejected", ToastAndroid.SHORT);
    if (onReject) onReject();
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    if (onLike) onLike();
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/profile_example.png")}
        style={styles.image}
      />

      <View style={styles.badge}>
        <Feather name="briefcase" size={14} color="red" />
        <Text style={styles.badgeText}>Travel Mode</Text>
        <Text style={styles.badgeTextSecondary}>
          {" "}
          | Originally from {origin}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={styles.name}>
            {name}, {age}{" "}
          </Text>
          <View style={styles.verifiedContainer}>
            <VerifiedCheckmark color="#EB1E25" />
          </View>
        </View>
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={14} color="red" />
          <Text style={styles.infoText}>{location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="phone" size={14} color="red" />
          <Text style={styles.infoText}>{phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleReject}>
          <TimesIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.mainButtonText}>View Number</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <FontAwesome
            name={liked ? "heart" : "heart-o"}
            size={24}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <PhoneNumberModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        phoneNumber="+254 700 000 000"
        isHidden={isHidden}
      />
    </View>
  );
};

export default ProfileCard;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    borderRadius: 20,
    backgroundColor: "#FFF",
    alignSelf: "center",
    marginVertical: 20,
  },
  verifiedContainer: {
    transform: [{ scale: 0.5 }],
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 520,
    borderRadius: 20,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FFF1F1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Oswald-Bold",
    color: "red",
    marginLeft: 4,
  },
  badgeTextSecondary: {
    fontSize: 12,
    color: "#333",
    fontFamily: "Oswald-Light"
  },
  infoContainer: {
    padding: 16,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 30,
    left: 8,
  },
  name: {
    fontSize: 20,
    color: "#FFF",
    alignItems: "center",
    fontFamily: "Oswald-Bold"
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#FFF",
    fontFamily: "Oswald-Regular"
  },
  actions: {
    position: "absolute",
    bottom: -40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  mainButton: {
    flex: 1,
    backgroundColor: "red",
    borderRadius: 30,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    maxWidth: 200,
  },
  mainButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Oswald-Regular"
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
