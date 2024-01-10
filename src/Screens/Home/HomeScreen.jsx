import { StyleSheet } from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Button, Text, FAB } from "react-native-paper";
import { Container } from "../../components";
import AuthContext from "../../Context/AuthContext";
import { removeDataFromStorage } from "../../utils/LocalStorage";

const HomeScreen = ({ navigation }) => {
  const { user, setUser } = React.useContext(AuthContext);

  // function hadle logout process
  const handleLogout = async () => {
    const currentUser = getAuth().currentUser;
    // check if there is a current user loged in
    if (currentUser) {
      //signOut
      await signOut(getAuth());
    }
    // remove user from local storage
    await removeDataFromStorage("user");
    setUser(null);
  };

  return (
    <Container style={{ padding: 10 }}>
      <Text variant="displaySmall">Welcome</Text>
      <Text variant="displayMedium">{user.displayName}</Text>
      {/* logout btn */}
      <Button mode="contained" style={styles.logoutBtn} onPress={handleLogout}>
        Logout
      </Button>
      {/* map btn */}
      <FAB
        icon="map"
        style={styles.fab}
        onPress={() => navigation.navigate("MapScreen")}
      />
    </Container> 
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "red",
    width: 300,
    alignSelf: "center",
    marginTop: 50,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 40,
  },
});
