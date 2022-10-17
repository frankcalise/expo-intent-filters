import { useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ShareMenu from "react-native-share-menu";

export default function App() {
  const [sharedData, setSharedData] = useState(null);
  const [sharedMimeType, setSharedMimeType] = useState(null);

  const handleShare = useCallback((item) => {
    if (!!item) {
      return;
    }

    console.log(item);
    // setSharedData(item.data[0].data);
    // setSharedMimeType(item.data[0].mimeType);
    // You can receive extra data from your custom Share View
  }, []);

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
