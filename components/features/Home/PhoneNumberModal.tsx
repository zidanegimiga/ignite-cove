import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
  ToastAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface PhoneNumberModalProps {
  visible: boolean;
  onClose: () => void;
  isHidden: boolean;
  phoneNumber: string
}

const PhoneNumberModal: React.FC<PhoneNumberModalProps> = ({
  visible,
  onClose,
  isHidden,
  phoneNumber
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={{width: "100%", flexDirection: "row", justifyContent: "center"}}>
          <View style={styles.dragHandle} />
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x-circle" size={28} color="black" />
          </TouchableOpacity>

          <Text style={styles.phoneIcon}>☎️</Text>

          <Text style={styles.title}>Phone Number</Text>

          {isHidden ? (
            <Text style={styles.hiddenText}>
              The user has hidden their number. We have sent a request to them to
              share the number. You will be notified when they do.
            </Text>
          ) : (
            <>
              <Text style={styles.subtitle}>Here’s the phone number</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{phoneNumber}</Text>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.actionButton} onPress={onClose}>
            <Text style={styles.actionButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PhoneNumberModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    // alignItems: "center",
  },
  dragHandle: {
    width: 50,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    marginBottom: 12,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  phoneIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "Oswald-Regular",
    marginBottom: 4,
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    textAlign: 'left'
  },
  hiddenText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
    // paddingHorizontal: 20,
    textAlign: 'left',
    fontFamily: "Oswald-Light"
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#F1F1F1",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  actionButton: {
    backgroundColor: "#EB1E25",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Oswald-Regular"
  },
});
