import React, { useMemo, useRef, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, { enableLogging } from "@gorhom/bottom-sheet";
import List from "./components/List";
import SearchHandle from "./components/SearchHandle";
import Button from "./components/Button";
import { GestureHandlerRootView } from "react-native-gesture-handler";

enableLogging();

const App = () => {
  // refs
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [200], []);

  // callbacks
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button onPress={handleExpandPress} title="Expand" />
        <Button onPress={handleClosePress} title="Close" />
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          keyboardBehavior="interactive"
          handleComponent={SearchHandle}
          animateOnMount={true}
          android_keyboardInputMode="adjustPan"
        >
          <List ref={bottomSheetRef} type="FlatList" />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 64,
    justifyContent: "flex-start",
    backgroundColor: "#222",
  },
});

export default App;
