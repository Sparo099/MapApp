import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button, Divider } from "react-native-paper";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Container } from "../../components";
import AuthContext from "../../Context/AuthContext";
import { saveDataToStorage } from "../../utils/LocalStorage";
const SignupScreen = ({ navigation }) => {
  const { setUser } = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  // function validate that all user input correct
  // return true if yes
  const validation = () => {
    let status = true;
    //check name
    if (name == "") {
      setNameError(true);
      status = false;
    }
    // check email
    if (email == "") {
      setEmailError(true);
      status = false;
    }
    // check password
    if (password == "") {
      setPasswordError(true);
      status = false;
    }
    // check confirm password
    if (confirmPassword == "") {
      setConfirmPasswordError(true);
      status = false;
    }
    // check confirm password with password
    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      status = false;
    }
    return status;
  };

  //function handle create new account process
  const handleCreateAccount = async () => {
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    // check if all inputs correct
    const status = validation();

    if (!status) return;
    setLoading(true);
    try {
      const auth = getAuth();
      // create new user with given password and email
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // update the display name with given name
      user.displayName = name;
      await updateProfile(user, { displayName: name });
      // save loged user on local storage for next time
      await saveDataToStorage("user", user);
      setUser(user);
    } catch (err) {
      console.log(err);
      alert("faled to create user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <Text variant="displaySmall">Create new account</Text>
      {/* inputs wrapper */}
      <View>
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Full Name"
          value={name}
          placeholder="Kuku Kuku"
          onChangeText={(text) => setName(text)}
          error={nameError}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Email"
          value={email}
          placeholder="test@test.com"
          onChangeText={(text) => setEmail(text)}
          error={emailError}
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
          error={passwordError}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Confirm Password"
          placeholder="**********"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          error={confirmPasswordError}
        />
      </View>
      {/* create account btn */}
      <Button
        mode="contained"
        style={{ marginVertical: 20 }}
        loading={loading}
        onPress={handleCreateAccount}
      >
        Create Account
      </Button>
      <Divider bold />
      {/* back to login btn */}
      <Button
        mode="contained-tonal"
        style={{ marginVertical: 20 }}
        onPress={() => navigation.goBack()}
      >
        Login
      </Button>
    </Container>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
