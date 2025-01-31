import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";

interface NormalDetailsCardProps {
  title: string;
  type: "personality" | "location";
  icon: React.ReactNode;
  dropdownItems: string[];
}

const NormalDetailsCard = ({ title, type, icon, dropdownItems }: NormalDetailsCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(dropdownItems[0]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(dropdownItems);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredItems(dropdownItems);
    } else {
      setFilteredItems(dropdownItems.filter((item) => item.toLowerCase().includes(text.toLowerCase())));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.contentContainer}>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          {icon}
          <ThemedText style={{ ...styles.title, color: "#EB1E25" }}>
            {selectedValue}
          </ThemedText>
        </View>

        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <ThemedText style={{...styles.title,...styles.changeText}}>Change</ThemedText>
        </TouchableOpacity>
      </View>

      {expanded && (
        <View style={styles.dropdownContainer}>
          <TextInput
            placeholder={`Search ${type}...`}
            value={searchText}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />

          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item}
            style={{ maxHeight: 150 }}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[styles.dropdownItem, selectedValue === item && styles.selectedItem]} 
                onPress={() => setSelectedValue(item)}
              >
                <ThemedText style={{ color: selectedValue === item ? "#FFF" : "#EB1E25" }}>
                  {item}
                </ThemedText>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.saveButton} onPress={() => setExpanded(false)}>
            <ThemedText style={styles.saveText}>Save</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default NormalDetailsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  title: {
    fontFamily: 'Oswald-Regular',
    fontSize: 14
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginTop: 16,
  },
  changeText: {
    fontFamily: 'Oswald-Regular',
    textDecorationLine: "underline",
    color: "#EB1E25"
  },
  dropdownContainer: {
    marginTop: 12,
    backgroundColor: "#FFF5F5",
    borderRadius: 8,
    padding: 10,
  },
  searchInput: {
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#EB1E25",
    marginBottom: 8,
  },
  dropdownItem: {
    padding: 8,
    borderRadius: 6,
    marginVertical: 4,
  },
  selectedItem: {
    backgroundColor: "#EB1E25",
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: "#EB1E25",
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  saveText: {
    color: "#FFF",
    fontWeight: "bold",
  }
});
