import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder,  value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Oswald-Regular',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    width: "100%",
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    fontFamily: "Oswald-Light",
    lineHeight: 24,
    height: 40
  },
});

export default InputField;