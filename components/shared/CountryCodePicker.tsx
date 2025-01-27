//@ts-ignore
// @ts-nocheck

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CountryCodeDropdownPicker from "../features/Payment/phone-countrycode-picker";

type CountryCodePickerProps = {
  onCountryChange: (country: CountryPayload) => void;
  onPhoneChange: (phone: string) => void;
  labels: {
    code?: string,
    phone?: string,
    placeholder?: string
  }
};

type CountryPayload = {name: string, dial_code: string, code: string, flag: string}

const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
  onCountryChange,
  onPhoneChange,
  labels
}) => {
  const [selected, setSelected] = React.useState("");
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
      setCountryDetails={(value: CountryPayload) => {
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
      labels={labels}
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
