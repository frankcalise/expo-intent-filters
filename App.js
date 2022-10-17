import { useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ShareMenu from "react-native-share-menu";

export default function App() {
  const [sharedData, setSharedData] = useState(null);
  const [sharedMimeType, setSharedMimeType] = useState(null);

  // only works when the app is in the background, not fully closed
  const handleShare = useCallback((item) => {
    console.log(item);
    if (!item) {
      return;
    }

    setSharedData(item.data);
    setSharedMimeType(item.mimeType);
    // You can receive extra data from your custom Share View
  }, []);

  // supposed to handle receiving intent when app is closed according to docs
  // but doesn't seem to be working?
  // useEffect(() => {
  //   ShareMenu.getInitialShare(handleShare);
  // }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, []);

  if (sharedMimeType === "text/plain") {
    // The user shared text
    return <Text>Shared text: {sharedData}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Waiting for share</Text>
      <StatusBar style="auto" />
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
