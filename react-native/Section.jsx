import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const screenHeight = Dimensions.get('window').height;

function Section({children, title}) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  scrollview: {
    backgroundColor: Colors.lighter,
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: 'f1f1f1',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.black,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Section;
