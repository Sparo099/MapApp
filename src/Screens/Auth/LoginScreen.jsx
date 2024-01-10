import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button, Divider } from "react-native-paper";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Container } from "../../components";
import AuthContext from "../../Context/AuthContext";
import { saveDataToStorage } from "../../utils/LocalStorage";

const LoginScreen = ({ navigation }) => {
  const { setUser } = React.useContext(AuthContext); // set current user
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // function handle the login flow
  const handleLogin = async () => {
    setError(false);
    // check if email or password are empty
    if (email === "" || password === "") {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      // login with the email and password
      const { user } = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      // save the loged user on local storage for the next time
      await saveDataToStorage("user", user);
      setUser(user);
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    // open signup screen
    navigation.navigate("SignupScreen");
  };

  return (
    <Container style={styles.container}>
      <Text variant="displaySmall">Login Screen</Text>

      {/* email and password wrapper */}
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Email"
          value={email}
          placeholder="test@test.com"
          onChangeText={(text) => setEmail(text)}
          error={error}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Password"
          placeholder="**********"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          error={error}
        />
      </View>

      {/* login and signup buttons wrapper */}
      <View style={styles.buttonsWRapper}>
        {/* login btn */}
        <Button
          mode="contained"
          style={styles.btn}
          onPress={handleLogin}
          loading={loading}
        >
          Login
        </Button>
        <Divider bold />
        {/* signup btn */}
        <Button
          mode="contained-tonal"
          style={styles.btn}
          onPress={handleSignup}
        >
          Signup
        </Button>
      </View>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonsWRapper: { marginTop: 20 },
  btn: {
    width: 200,
    alignSelf: "center",
    marginVertical: 10,
  },
});
