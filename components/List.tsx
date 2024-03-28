import React, { useMemo, useCallback, forwardRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

const List = forwardRef((props, ref) => {
  const { type = "View", count = 20 } = props;
  // variables
  const data = useMemo(
    () =>
      Array(count)
        .fill(0)
        .map((_, index) => ({ id: `item-${index}`, title: `Item #${index}` })),
    [count]
  );

  // renders
  const renderItem = useCallback(
    (item) => (
      <TouchableOpacity
        style={styles.itemContainer}
        key={item.id}
        onPress={() => ref.current?.close()}
      >
        <Text>{item.title}</Text>
      </TouchableOpacity>
    ),
    []
  );

  const renderFlatListItem = useCallback(
    ({ item }) => renderItem(item),
    [renderItem]
  );

  if (type === "View") {
    return (
      <BottomSheetView style={styles.contentContainer}>
        {data.map(renderItem)}
      </BottomSheetView>
    );
  } else if (type === "FlatList") {
    return (
      <BottomSheetFlatList
        data={data}
        initialNumToRender={5}
        bounces={true}
        windowSize={10}
        maxToRenderPerBatch={5}
        renderItem={renderFlatListItem}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      />
    );
  } else if (type === "ScrollView") {
    return (
      <BottomSheetScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {data.map(renderItem)}
      </BottomSheetScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    overflow: "visible",
  },
  itemContainer: {
    paddingVertical: 6,
  },
});

export default List;
