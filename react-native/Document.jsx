import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {joyfillSave, joyfillGenerate, joyfillRetrieve} from './api.js';

/**
 * Import JoyDoc
 */
import {JoyDoc} from '@joyfill/components-react-native';


const screenWidth = Dimensions.get('window').width;

const userAccessToken = '<REPLACE_ME>';
const documentId = '<REPLACE_ME>';

const FormModes = {
  fill: 'fill',
  readonly: 'readonly',
};

function Document() {

  const [mode, setMode] = useState(FormModes.fill);
  const altMode = mode === FormModes.readonly ? FormModes.fill : FormModes.readonly;

  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(false);


  /**
   * Retrieve document from Joyfill api. Don't forget to add documentId and userAccessToken
   */
  useEffect(() => {
    retrieveJofillDocument();
  }, []);

  const retrieveJofillDocument = async () => {
    setLoading('retrieving document...');
    const response = await joyfillRetrieve(documentId, userAccessToken);
    setDoc(response);
    setLoading(null);
  };

  /**
   * Handle saving document changes to Joyfill api. 
   */
  const saveJoyfillDocument = async () => {

    setLoading('saving document & generating pdf...');

    const response = await joyfillSave(doc, userAccessToken);
    console.log('>>>>>>>>>>>>>>>> repsonse: ', response);

    setDoc(response);
    setLoading(null);

    //Uncomment below to see pdf download
    //const downloadableLink = await joyfillGenerate(doc.identifier, userAccessToken);
    //console.log(downloadableLink);

  };

  return (
    <>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator />
          <Text>Loading...</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.title}>{doc?.name || 'Joyfill Form'}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setMode(altMode) }
        >
          <Text style={styles.buttonText}>{`Set to ${altMode}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveJoyfillDocument} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {doc && (
        <View style={styles.form}>
          <JoyDoc
            mode={mode}
            doc={doc}
            width={screenWidth}
            onChange={(params, changes, doc) => {
              console.log('changes: ', params, changes, doc);
              setDoc(doc);
            }}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    margin: 20,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E6E6FA',
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
});

export default Document;
