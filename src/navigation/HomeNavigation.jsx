import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, MapScreen } from "../Screens/Home";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
      <Stack.Screen component={MapScreen} name="MapScreen" />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
