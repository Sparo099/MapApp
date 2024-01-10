import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";

const Container = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView />
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
