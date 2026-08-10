import React, { useState, useEffect } from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';

import TemplateList from './TemplateList';
import TemplateDocumentList from './TemplateDocumentList';
import Document from './Document';

function App() {

  const [ activeDoc, setActiveDoc ] = useState(null)
  const [ activeTemplate, setActiveTemplate ] = useState(null)

  let PageNode = null;

  if (activeDoc) {
    PageNode = (
      <Document 
        doc={activeDoc} 
        onBack={() => {
          setActiveDoc(null);
          setActiveTemplate(null);
        }}
      />
    );
  } else if (activeTemplate) {
    PageNode = (
      <TemplateDocumentList 
        template={activeTemplate} 
        onViewDocument={(doc) => {
          setActiveDoc(doc);
          setActiveTemplate(null);
        }}
      />
    );
  } else {
    PageNode = (
      <TemplateList 
        onViewDocument={(doc) => {
          setActiveDoc(doc);
          setActiveTemplate(null);
        }}
        onViewTemplateDocuments={(template) => {
          setActiveTemplate(template);
          setActiveDoc(null);
        }}
      />
    )
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {PageNode}
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
