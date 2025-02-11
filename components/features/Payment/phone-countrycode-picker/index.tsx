// @ts-nocheck
import React, { JSXElementConstructor } from "react";
import MaterialIcons from '@expo/vector-icons'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  TextInput,
  Image,
  ViewStyle,
  TextStyle,
} from "react-native";
import { countries, _getFlag } from "./_inc/_lib/enhanced";
import { useFonts } from "expo-font";
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CountryCodeProps {
  /**
   * Selected Country Dial Code
   */
  selected: string;
  /**
   * Function to set the country
   */
  setSelected: React.Dispatch<React.SetStateAction<undefined>>;
  /**
   * Function to set the country
   */
  setCountryDetails?: React.Dispatch<React.SetStateAction<undefined>>;
  /**
   * State variable for storing the phone number
   */
  phone?: string;
  /**
   * Function to set the phone number state variable
   */
  setPhone?: React.Dispatch<React.SetStateAction<undefined>>;
  /**
   * Style the Country Code Container
   */
  countryCodeContainerStyles?: ViewStyle;
  /**
   * Style the text inside Country Code
   */
  countryCodeTextStyles?: TextStyle;
  /**
   * Phone Text Input Styles
   */
  phoneStyles?: ViewStyle;
  /**
   * URL for the search Icon
   */
  searchIcon?: string;
  /**
   * URL for the close Icon
   */
  closeIcon?: string;
  /**
   * Search Input Container Styles
   */
  searchStyles?: ViewStyle;
  /**
   * Search Input Text Styles
   */
  searchTextStyles?: TextStyle;
  /**
     /**
    * Search Dropdown Container Styles
    */
  dropdownStyles?: ViewStyle;
  /**
   * Search Dropdown Text Styles
   */
  dropdownTextStyles?: TextStyle;
  /**
   * Labels and placeholders
   */
  labels?: {
    code: "Code",
    phone: "Phone Number",
    placeholder: "Enter Phone Number"
  };
}

const CountryCodeDropdownPicker: React.FC<CountryCodeProps> = ({
  selected,
  setSelected,
  setCountryDetails = () => {},
  phone,
  setPhone,
  countryCodeContainerStyles = {},
  countryCodeTextStyles = {},
  phoneStyles = {},
  searchIcon,
  closeIcon,
  searchStyles = {},
  searchTextStyles = {},
  dropdownStyles = {},
  dropdownTextStyles = {},
  labels
}) => {
  const [loaded, error] = useFonts({
    "Oswald-Regular": require("../../../../assets/fonts/oswald/Oswald-Regular.ttf"),
    "Oswald-Medium": require("../../../../assets/fonts/oswald/Oswald-Medium.ttf"),
    "Oswald-Light": require("../../../../assets/fonts/oswald/Oswald-Light.ttf"),
  });

  const theme = useColorScheme() ?? 'light';

  const [_selected, _setSelected] = React.useState(false);
  const [_search, _setSearch] = React.useState("");
  const [_countries, _setCountries] = React.useState(countries);
  const [isOpen, setIsOpen] = React.useState(false);

  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const _static = {
    search: searchIcon ?? require("./_inc/images/search.png"),
    close: closeIcon ?? require("./_inc/images/close.png"),
  };

  const slideDown = () => {
    _setSelected(true);
    setIsOpen(!isOpen)
    Animated.timing(slideAnim, {
      toValue: 235,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const slideUp = () => {
    setIsOpen(!isOpen)
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => _setSelected(false));
  };

  function _searchCountry(country) {
    _setSearch(country);
    let c = countries.filter((item) => {
      return item.name.includes(country);
    });
    _setCountries(c);
  }

  const RenderBtn = () => {
    if (!_selected) {
      return (
        <View style={[styles.row, {}]}>
          <View>
            <Text
              style={{
                fontFamily: "Oswald-Medium",
                fontSize: 14,
                marginBottom: 6,
              }}
            >
              {labels?.code}
            </Text>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {
                _setCountries(countries);
                slideDown();
              }}
            >
              <View
                style={[styles.selectedContainer, countryCodeContainerStyles]}
              >
                <Text style={{ color: "#000", marginRight: 5 }}>
                  {_getFlag(selected)}
                </Text>
                <Text
                  style={[
                    countryCodeTextStyles,
                    { fontFamily: "Oswald-Light", fontSize: 14 },
                  ]}
                >
                  {selected}
                </Text>
                <IconSymbol
                  name="chevron.right"
                  size={18}
                  weight="medium"
                  color={
                    theme === "light" ? Colors.light.icon : Colors.dark.icon
                  }
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {phone != undefined && setPhone != undefined ? (
            <View style={{ width: "75%" }}>
              <Text
                style={{
                  fontFamily: "Oswald-Medium",
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                {labels?.phone}
              </Text>
              <TextInput
                style={[
                  {
                    fontFamily: "Oswald-Light",
                    paddingVertical: 5,
                    paddingLeft: 15,
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: "#CBD5E1",
                    backgroundColor: "#fff",
                  },
                  phoneStyles,
                ]}
                placeholder={labels?.placeholder}
                keyboardType={"phone-pad"}
                placeholderTextColor={"#dddddd"}
                onChangeText={setPhone}
                value={phone}
              />
            </View>
          ) : (
            <View></View>
          )}
        </View>
      );
    } else {
      return (
        <View style={[styles.inputBoxContainer, searchStyles]}>
          <View style={[styles.row, { width: "90%" }]}>
            <Image
              source={_static.search}
              resizeMode={"contain"}
              style={[styles.icon, { width: 15, height: 15, marginLeft: 10 }]}
            />
            <TextInput
              style={[
                { marginLeft: 5, paddingVertical: 3, flex: 1 },
                searchTextStyles,
              ]}
              onChangeText={_searchCountry}
              value={_search}
            />
          </View>

          <TouchableOpacity
            onPress={() => slideUp()}
            style={{ marginHorizontal: 10 }}
          >
            <Image
              source={_static.close}
              resizeMode={"contain"}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderCountryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.countryContainer}
        key={item.code}
        onPress={() => {
          setSelected(item.dial_code);
          setCountryDetails(item);
          slideUp();
        }}
      >
        <Text style={styles.countryFlag}>{item?.flag}</Text>
        <Text style={[styles.countryText, dropdownTextStyles]}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {RenderBtn()}

      {_selected ? (
        <Animated.View style={{ maxHeight: slideAnim }}>
          <FlatList
            data={_countries}
            style={[styles.valuesContainer, dropdownStyles]}
            showsVerticalScrollIndicator={false}
            renderItem={renderCountryItem}
            keyExtractor={(item) => item.code}
            ListEmptyComponent={
              <Text style={{ padding: 15, textAlign: "center" }}>
                No Result Found
              </Text>
            }
          />
        </Animated.View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CountryCodeDropdownPicker;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  container: {
    width: "100%",
  },
  selectedContainer: {
    padding: 10,
    flexDirection: "row",
    minWidth: "20%",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    backgroundColor: "white",
  },
  valuesContainer: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    maxHeight: 235,
    backgroundColor: "white",
    marginTop: 8,
  },
  countryContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: "#dedede",
    alignItems: "center",
  },
  countryFlag: {
    marginRight: 8,
    color: "black",
  },
  countryText: {
    fontWeight: "bold",
  },
  inputBoxContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 10,
    height: 10,
  },
});
