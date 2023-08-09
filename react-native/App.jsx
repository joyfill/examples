import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import Document from './Document';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Document />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    padding: 10,
  },
});

export default App;
