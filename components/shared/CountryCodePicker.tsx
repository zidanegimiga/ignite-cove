//@ts-ignore
// @ts-nocheck

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CountryCodeDropdownPicker from "react-native-dropdown-country-picker";

const CountryCodePicker = () => {
  const [selected, setSelected] = React.useState("+91");
  const [country, setCountry] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <View>
      <CountryCodeDropdownPicker 
          selected={selected} 
          setSelected={setSelected}
          setCountryDetails={setCountry} 
          phone={phone} 
          setPhone={setPhone} 
          countryCodeContainerStyles={{paddingVertical: 5}}
          countryCodeTextStyles={{fontSize: 11}}
        />
        <Text style={{marginTop: 10}}>{country?.flag} {country?.name}</Text>
    </View>
  );
};

export default CountryCodePicker;

const styles = StyleSheet.create({});
