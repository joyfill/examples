import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// 1. import the JoyDoc component
import {JoyDoc} from '@joyfill/components-react-native';

import {joyfillSave, joyfillGenerate, joyfillRetrieve} from './api.js';

const screenWidth = Dimensions.get('window').width;

// 2, replace here with steps from our Getting Started -> Setup guide
const userAccessToken = '';
const documentId = '';

const FormModes = {
  fill: 'fill',
  readonly: 'readonly',
};

function Document() {
  const [doc, setDoc] = useState(null);
  const [mode, setMode] = useState(FormModes.fill);
  const [pdfLink, setPdfLink] = useState(null);
  const [loading, setLoading] = useState(null);

  // retrieve the document from our api (you can also pass an initial documentId into JoyDoc)
  useEffect(() => {
    retrieveJofillDocument();
  }, []);

  const retrieveJofillDocument = async () => {
    setLoading('retrieving document...');
    const response = await joyfillRetrieve(documentId, userAccessToken);
    setDoc(response);
    setLoading(null);
  };

  // save the form and generate a pdf as an example
  const saveForm = async doc => {
    setLoading('saving document & generating pdf...');
    await joyfillSave(doc, userAccessToken);
    const downloadableLink = await joyfillGenerate(
      doc.identifier,
      userAccessToken,
    );
    setPdfLink(downloadableLink);
    setLoading(null);
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
          onPress={() =>
            setMode(
              mode === FormModes.readonly ? FormModes.fill : FormModes.readonly,
            )
          }>
          <Text style={styles.buttonText}>{`Set to ${
            mode === FormModes.readonly ? FormModes.fill : FormModes.readonly
          }`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => saveForm(doc)} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {doc && (
        <JoyDoc
          mode={mode}
          doc={doc}
          width={screenWidth}
          onChange={(params, changes, doc) => {
            console.log('onChange doc: ', doc);
            setDoc(doc);
          }}
          onUploadAsync={async ({documentId}, fileUploads) => {
            // to see a full utilization of upload see api.js -> examples
            console.log('onUploadAsync: ', fileUploads);
          }}

          // Used for page navigation controls
          // initialPageId="<pageId>" // found in: doc.files[0].pages[0].id
          // navigation={{pages: false}}
        />
      )}
      <View style={styles.row}>{pdfLink && <Text>{pdfLink}</Text>}</View>
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
