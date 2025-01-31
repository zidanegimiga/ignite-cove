import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";

interface DetailItem {
  label: string;
  value: string;
}

interface ExpandableCardProps {
  title: string;
  details: DetailItem[];
}

const ExpandableCard = ({ title, details }: ExpandableCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(details);

  const handleTextChange = (text: string, index: number) => {
    const newData = [...data];
    newData[index].value = text;
    setData(newData);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.header, { borderBottomWidth: expanded ? 1 : 0 }]} 
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.title}>{title}</Text>
        <Feather name={expanded ? "chevron-up" : "chevron-down"} size={20} color="black" />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.label}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View style={styles.row}>
                <Text style={styles.label}>{item.label}:</Text>
                {editing ? (
                  <TextInput
                    style={styles.input}
                    value={item.value}
                    onChangeText={(text) => handleTextChange(text, index)}
                  />
                ) : (
                  <Text style={styles.value}>{item.value}</Text>
                )}
              </View>
            )}
          />
        </View>
      )}

      {expanded && (
        <TouchableOpacity onPress={() => setEditing(!editing)} style={styles.editButton}>
          <ThemedText style={styles.editText}>{editing ? "Save" : "Edit"}</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExpandableCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontFamily: "Oswald-Regular",
    fontSize: 14,
  },
  content: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    paddingVertical: 6,
  },
  label: {
    fontSize: 14,
    color: "#333",
    fontFamily: 'Oswald-Light'
  },
  value: {
    fontSize: 14,
    fontFamily: 'Oswald-Regular',
    color: "black",
    marginLeft: 4,
  },
  input: {
    fontSize: 14,
    fontFamily: 'Oswald-Regular',
    color: "black",
    marginLeft: 3,
    borderBottomWidth: 1,
    borderColor: "#EB1E25",
    paddingBottom: 2,
  },
  editButton: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  editText: {
    color: "#EB1E25",
    textDecorationLine: "underline",
    fontFamily: 'Oswald-Regular',
  },
});

