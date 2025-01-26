//@ts-ignore
// @ts-nocheck

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CountryCodeDropdownPicker from "../features/Payment/phone-countrycode-picker";

type CountryCodePickerProps = {
  onCountryChange: (country: string) => void;
  onPhoneChange: (phone: string) => void;
};

const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
  onCountryChange,
  onPhoneChange,
}) => {
  const [selected, setSelected] = React.useState("+254");
  const [country, setCountry] = React.useState("");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    onCountryChange(country);
  }, [country, onCountryChange]);

  React.useEffect(() => {
    onPhoneChange(phone);
  }, [phone, onPhoneChange]);

  return (
    <CountryCodeDropdownPicker
      selected={selected}
      setSelected={setSelected}
      setCountryDetails={(value: string) => {
        setCountry(value);
        onCountryChange(value);
      }}
      phone={phone}
      setPhone={(value: string) => {
        setPhone(value);
        onPhoneChange(value);
      }}
      countryCodeContainerStyles={{ paddingVertical: 5 }}
      countryCodeTextStyles={{ fontSize: 11 }}
      phoneStyles={{ width: "100%" }}
    />
  );
};

export default CountryCodePicker;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 156,
  },
});
