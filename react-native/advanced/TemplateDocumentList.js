import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { retrieveDocuments } from '../api';
import { getDocumentFromTemplate } from '@joyfill/components-react-native';

const TemplateDocumentList = ({ template, onViewDocument }) => {

  const [docs, setDocs] = useState([]);

  /**
   * Step 1: Retrieve list of template documents
   */
  useEffect(() => {

    const handleRetrieveTemplateDocuments = async () => {
      const res = await retrieveDocuments(template.identifier)
      setDocs(res.data);
    }

    handleRetrieveTemplateDocuments();

  }, [])

  if (!docs || docs.length < 1) return <Text>Loading docs...</Text>

  const docNodes = docs.map((doc) => { 
    return (
      <View style={Styles.item} key={doc._id}>
        <Text style={Styles.title}>{doc.name} - {new Date(doc.createdOn).toString()}</Text>
        <View style={Styles.actions}>
          <Pressable
            onPress={() => onViewDocument(doc)}
            style={Styles.button}
          >
            <Text style={Styles.buttonText}>Edit</Text>
          </Pressable>
        </View>
      </View>
    );
  })

  return (
    <ScrollView style={Styles.scrollview}>
      {docNodes}
    </ScrollView>
  );

};

const Styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey' 
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12
  },
  buttonText: {
    color: "#276FFA",
    fontWeight: 'bold',
  }
});

export default React.memo(TemplateDocumentList);
