import React, { useEffect, useState } from "react";
import OneSignal from "react-native-onesignal";
import { Text, View, StyleSheet, StatusBar, Linking } from "react-native";

export default function App() {
  /////ONE SIGNAL IMPLEMENTATION/////
  const onReceived = (notification) => {
    console.log("Notification received: ", notification);
  };

  const onOpened = async (openResult) => {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
    console.log("Data: ", openResult.notification.payload.additionalData);
  };

  const onIds = (device) => {
    console.log("Device info: ", device);
  };
  useEffect(() => {
    // Setting requestPermissions
    const permissions = {
      alert: true,
      badge: true,
      sound: true,
    };
    OneSignal.requestPermissions(permissions);
    OneSignal.setLogLevel(6, 0);

    OneSignal.init("YOUR_APP_ID", {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    OneSignal.addEventListener("received", onReceived);
    OneSignal.addEventListener("opened", onOpened);
    OneSignal.addEventListener("ids", onIds);

    return () => {
      OneSignal.removeEventListener("received", onReceived);
      OneSignal.removeEventListener("opened", onOpened);
      OneSignal.removeEventListener("ids", onIds);
    };
  }, []);

  ////////
  return (
    <View>
      <Text>Hello React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
