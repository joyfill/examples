![joyfill_logo](https://github.com/joyfill/examples/assets/5873346/4943ecf8-a718-4c97-a917-0c89db014e49)

# @joyfill/components-react-native
We recommend visiting our official react-native setup guide https://docs.joyfill.io/docs/react-native.

## Project Requirements
_userAccessTokens & identifiers will need to be stored on your end (usually on a user and set of existing form field-based data) in order to interact with our API and UI Components effectively_

- React and React DOM v17+
- React-Native v0.70.0+

## Install Dependency

### React-Native CLI (bare)

```shell npm
$ npm install @joyfill/components-react-native@latest react-native-webview react-native-svg --save
$ cd ios && pod install
```
```Text Yarn
$ yarn add @joyfill/components-react-native@latest react-native-webview react-native-svg
$ cd ios && pod install
```

### Expo (managed)

```shell npm
$ npm install @joyfill/components@latest
```
```Text Yarn
$ yarn add @joyfill/components@latest
```

## Implement your code
For full examples please see [https://docs.joyfill.io/docs/react-native](https://docs.joyfill.io/docs/react-native#implement-your-code).

Below is a usable example of our react-native document native embedded. This will show a readonly or fillable depending on the `mode` form to your users. The document (form) shown is based on your `documentId`.

Make sure to replace the `userAccessToken` and `documentId`. Note that `documentId` is just for this example, you can call our [List all documents](ref:list-all-documents) endpoint and grab an ID from there.

```
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {JoyDoc} from '@joyfill/components-react-native';
import {joyfillRetrieve} from './api.js';

const screenWidth = Dimensions.get('window').width;

const userAccessToken = '<REPLACE_ME>';
const documentId = '<REPLACE_ME>';

const FormModes = {
  fill: 'fill',
  readonly: 'readonly',
};

function Document() {
  const [doc, setDoc] = useState(null);

  // retrieve the document from our api (you can also pass an initial documentId into JoyDoc)
  useEffect(() => {
    const response = await joyfillRetrieve(documentId, userAccessToken).then(doc => {
      setDoc(response);
    });
  }, []);

  return (
    <>
      <Text style={styles.title}>{doc?.name || 'Joyfill Form'}</Text>
      {doc && (
        <View style={styles.form}>
          <JoyDoc
            mode={FormModes.fill}
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
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E6E6FA',
    padding: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
});

export default Document;

```

### JoyDoc Properties

* `mode: 'fill' | 'readonly'`
  * **Required***
  * Enables and disables certain JoyDoc functionality and features. 
  * Options
    * `fill` is the mode where you simply input the field data into the form
    * `readonly` is the mode where everything in the form is set to read-only.
* `doc: object`
  * The default JoyDoc JSON starting object to load into the component view. Must be in the JoyDoc JSON data structure.
* `onChange: (params: object, changes: object, doc: object) => {}` 
  * Used to listen to any changes to the style, layout, values, etc. across all modes.
  * `params: object`
    * Contains information about what field has been changed.
  * `changes: object`
    * Can contain any of the JoyDoc JSON structure supported properties.
  * `doc: object`
    * Fully updated JoyDoc JSON structure with changes applied.
