import React, {useState, useEffect} from 'react';
import { Dimensions, StyleSheet, Text, View, Pressable, SafeAreaView, StatusBar } from 'react-native';
import { retrieveDocument, updateDocument, updateDocumentChangelogs, createDocumentPDF } from '../api.js';

import { JoyDoc } from '@joyfill/components-react-native';

const screenWidth = Dimensions.get('window').width;

function App() {

  const [doc, setDoc] = useState(null);
  const [docChangelogs, setDocChangelogs] = useState([]);

  /**
   * Step 1: Retrieve template
   */
  useEffect(() => {
    const retrieve = async () => {
      const doc = await retrieveDocument("doc_64d656c6bfdead31d7522fde");
      setDoc(doc);
    };
    retrieve();

  }, []);


  /**
   * Step 2: Save document changes
   */
  const handleDocumentUpdate = async () => {

    /**
     * Update Option 1: Full document update/overwrite
     */
    const updatedDoc = await updateDocument(doc);
    setDoc(updatedDoc);

    /**
     * Update Option 2: Uncomment below to use changelog updates for multi-collaborator support. 
     * Learn more about changelog updates here: https://docs.joyfill.io/docs/changelogs
     */
    //const updatedDoc = await updateDocumentChangelogs(doc, docChangelogs);
    //setDoc(updatedDoc);
    //setDocChangelogs([]);

    /**
     * PDF: Uncomment below to generate pdf download link
     */
    //const downloadableLink = await createDocumentPDF(doc);
    //console.log(downloadableLink);

  };

  if (!doc) return <Text>Loading doc...</Text>

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar />
      <View style={Styles.form}>
        <JoyDoc
          navigation={{pages: false}}
          mode="fill"
          doc={doc}
          width={screenWidth}
          onChange={(changelogs, doc) => {
            console.log('>>>>>>>> onChange: ', changelogs, doc);
            setDoc(doc);
            setDocChangelogs(docChangelogs.concat(changelogs));
          }}
        />
        <View style={Styles.actions}>
          <Pressable
            onPress={handleDocumentUpdate}
            style={Styles.button}
          >
            <Text style={Styles.buttonText}>Update</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );

}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default App;

