import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { retrieveTemplates, createDocument } from '../api';
import { getDocumentFromTemplate } from '@joyfill/components-react-native';

const TemplateList = ({ onViewDocument, onViewTemplateDocuments }) => {

  const [templates, setTemplates] = useState([]);

  /**
   * Step 1: Retrieve list of templates
   */
  useEffect(() => {

    const retrieve = async () => {
      const res = await retrieveTemplates()
      setTemplates(res.data);
    }

    retrieve();

  }, [])

  /**
   * Step 2: Create a document from a template
   *
   * TIP:  When working with groups you can simply add the "group: <GROUP_IDENTIFIER>" 
   * property to a new template or document payload and it will be created and 
   * assigned to that invidual group.
   */
  const handleCreateDocument = async (template) => {
    const newDocPayload = getDocumentFromTemplate(template);
    const doc = await createDocument(newDocPayload);
    onViewDocument(doc);
  }

  if (!templates || templates.length < 1) return <Text>Loading templates...</Text>

  const templateNodes = templates.map((template) => { 
    return (
      <View style={Styles.item} key={template._id}>
        <Text style={Styles.title}>{template.name}</Text>
        <View style={Styles.actions}>
          <Pressable
            onPress={() => handleCreateDocument(template)}
            style={Styles.button}
          >
            <Text style={Styles.buttonText}>Fill Out</Text>
          </Pressable>
          <Pressable
            onPress={() => onViewTemplateDocuments(template)}
            style={Styles.button}
          >
            <Text style={Styles.buttonText}>View Documents</Text>
          </Pressable>
        </View>
      </View>
    );
  })

  return (
    <ScrollView style={Styles.scrollview}>
      {templateNodes}
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

export default React.memo(TemplateList);
