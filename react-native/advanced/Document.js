import React, {useState, useEffect} from 'react';
import { Dimensions, StyleSheet, Text, View, Pressable } from 'react-native';
import { updateDocument, updateDocumentChangelogs, createDocumentPDF } from '../api.js';

import { JoyDoc } from '@joyfill/components-react-native';

const screenWidth = Dimensions.get('window').width;

function Document(props) {

  const identifier = props.doc.identifier;

  const [doc, setDoc] = useState(props.doc);
  const [docChangelogs, setDocChangelogs] = useState([]);

  const handleDocumentUpdate = async () => {

    /**
     * Update Option 1: Full document update/overwrite
     */
    const updatedDoc = await updateDocument(identifier, doc);
    if (updateDoc) setDoc(updatedDoc);

    /**
     * Update Option 2: Uncomment below to use changelog updates for multi-collaborator support. 
     * Learn more about changelog updates here: https://docs.joyfill.io/docs/changelogs
     */
    //const updatedDoc = await updateDocumentChangelogs(identifier, docChangelogs);
    //if (updateDoc) setDoc(updatedDoc);
    //setDocChangelogs([]);

    /**
     * PDF: Uncomment below to generate pdf download link
     */
    //const downloadablePDFLink = await createDocumentPDF(identifier);
    //console.log(downloadablePDFLink);

  };

  return (
    <View style={Styles.form}>
      <JoyDoc
        mode="fill"
        doc={doc}
        width={screenWidth}
        onChange={(changelogs, data) => {

          /**
           * Changelogs represent the individual change that was made
           * Data represents the entire data structure with all new changes applied.
           */
          console.log('>>>>>>>>: ', changelogs, data);

          setDoc(data);
          setDocChangelogs(docChangelogs.concat(changelogs));

        }}
      />
      <View style={Styles.actions}>
        <Pressable
          onPress={props.onBack}
          style={Styles.button}
        >
          <Text style={Styles.buttonText}>Back</Text>
        </Pressable>
        <Pressable
          onPress={handleDocumentUpdate}
          style={Styles.button}
        >
          <Text style={Styles.buttonText}>Update</Text>
        </Pressable>
      </View>
    </View>
  );

}

const Styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: 'white',
    padding: 2,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E90FF',
    padding: 10,
  },
  buttonText: {
    color: '#1E90FF',
  },
  row: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlight: {
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  actions: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: "#276FFA",
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12
  },
  buttonText: {
    color: "#276FFA",
    fontWeight: 'bold',
  }

});

export default Document;

