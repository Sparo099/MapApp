import React from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigation from "./src/navigation/RootNavigation";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDoYODChz638vQ_Hq3sMnDtPPxIqUiJvPI",
  authDomain: "mapsapp-2d435.firebaseapp.com",
  projectId: "mapsapp-2d435",
  storageBucket: "mapsapp-2d435.appspot.com",
  messagingSenderId: "335253293087",
  appId: "1:335253293087:web:eebf2c273e94d2f7f82d2a",
};
try {
  // Initialize Firebase
  initializeApp(firebaseConfig);
} catch (err) {}

export default function App() {
  return (
    <>
      <RootNavigation />
      <StatusBar style="auto" />
    </>
  );
}
