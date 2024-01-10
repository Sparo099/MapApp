import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const API_KY = "AIzaSyDoYODChz638vQ_Hq3sMnDtPPxIqUiJvPI";
const COLORS = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FFA500", // Orange
  "#800080", // Purple
  "#008000", // Dark Green
  "#FFC0CB", // Pink
];

const MapScreen = ({ navigation }) => {
  // list that holds all added regions
  const [regions, setRegions] = React.useState([]);

  const RADIUS = 40000; // 40km
  // init default location
  const DEFAULT_LOCATION = React.useRef({
    latitude: 32.103376857642246,
    longitude: 35.20905301042528,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    description: "Im here",
  }).current;
//BackAction in react to go stpe back
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <View style={styles.wrapper}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          placeholder="Search"
          onPress={(data, details = null) => {
            console.log(data);
            // add new regions to the list
            setRegions((prev) => [
              ...prev,
              {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: DEFAULT_LOCATION.latitudeDelta,
                longitudeDelta: DEFAULT_LOCATION.longitudeDelta,
                description: data.description.slice(0, 30) + "...",
              },
            ]);
          }}
          query={{
            key: API_KY,
            language: "en",
            types: "establishment",
            radius: RADIUS,//40km 
            location: `${DEFAULT_LOCATION.latitude},${DEFAULT_LOCATION.longitude}`,
          }}
          styles={{
            container: {
              flex: 0,
              position: "absolute",
              width: "100%",
              zIndex: 1,
            },
            listView: { backgroundColor: "white" },
          }}
        />

        <MapView
          style={styles.map}
          // 32.103376857642246, 35.20905301042528
          initialRegion={{
            latitude: DEFAULT_LOCATION.latitude,
            longitude: DEFAULT_LOCATION.longitude,
            latitudeDelta: DEFAULT_LOCATION.latitudeDelta,
            longitudeDelta: DEFAULT_LOCATION.longitudeDelta,
          }}
          provider="google" // for google maps insted of default map of the phone
        >
          <Marker
            coordinate={{
              latitude: DEFAULT_LOCATION.latitude,
              longitude: DEFAULT_LOCATION.longitude,
            }}
            pinColor="blue"// our LOCATION in the map is blue all the time 
            draggable={true}
          >
            <Callout>
              <Text>{DEFAULT_LOCATION.description}</Text>
            </Callout>
          </Marker>

          {/* render all regions as markers on the map */}
          {regions.map((region, index) => (
            <Marker
              key={index.toString()}
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              pinColor={COLORS[index % COLORS.length]} // each marker get deferent color
              draggable={true}
            >
              <Callout>
                <Text>{region.description}</Text>
              </Callout>
            </Marker>
          ))}
          {/* search area circle */}
          <Circle
            center={{
              latitude: DEFAULT_LOCATION.latitude,
              longitude: DEFAULT_LOCATION.longitude,
            }}
            radius={RADIUS}
          ></Circle>
        </MapView>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
