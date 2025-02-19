// @ts-nocheck
import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import CountryCodeDropdownPicker from "../features/Payment/phone-countrycode-picker";

type CountryCodePickerProps = {
  onCountryChange: (country: CountryPayload) => void;
  onPhoneChange: (phone: string) => void;
  labels: {
    code?: string;
    phone?: string;
    placeholder?: string;
  };
  onCompletionChange: (isComplete: boolean) => void;
};

type CountryPayload = {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
};

const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
  onCountryChange,
  onPhoneChange,
  labels,
  onCompletionChange,
}) => {
  const [selected, setSelected] = useState<string | undefined>(undefined); // ✅ Fix type
  const [country, setCountry] = useState<CountryPayload | null>(null);
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    onCompletionChange(!!(country && phone.trim() !== ""));
  }, [country, phone, onCompletionChange]);

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
