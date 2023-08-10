import React from 'react';
import {SafeAreaView, View, StatusBar, StyleSheet} from 'react-native';

import Document from './Document';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.viewer}>
        <Document />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewer: {
    flex: 1,
    padding: 10,
  },
});

export default App;
