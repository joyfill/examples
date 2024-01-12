import Joyfill from "@joyfill/components/dist/joyfill.min.js";
import { retrieveTemplate } from './api.js';

const initJoyfill = async () => {

  const identifier = '<REPLACE_YOUR_TEMPLATE_IDENTIFIER>';

  const template = await retrieveTemplate(identifier);

  Joyfill.JoyDoc(
    document.getElementById('joyfill'),
    {
      doc: template,
      mode: 'edit',
      onChange: (changelogs, doc) => {

        /**
         * Changelogs represent the individual change that was made
         * Data represents the entire data structure with all new changes applied.
         */
        console.log('onChange: ', changelogs, doc);
      }
    }
  );

}

initJoyfill();
