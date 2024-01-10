import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getDataFromStorage } from "../utils/LocalStorage";
import HomeNavigation from "./HomeNavigation";
import AuthNaviation from "./AuthNavigation";
import AuthContext from "../Context/AuthContext";

const RootNavigation = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getDataFromStorage("user", null);
      setUser(currentUser);
      setLoading(false);
    };
    fetchCurrentUser();
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {/* is user exist then show Home screen else show login screen */}
        {user === null ? <AuthNaviation /> : <HomeNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default RootNavigation;
