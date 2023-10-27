import Joyfill from "@joyfill/components/dist/joyfill.min.js";

Joyfill.JoyDoc(
  document.getElementById('joyfill'),
  {
    mode: 'edit',
    onChange: (changelogs, doc) => console.log('onChange: ', changelogs, doc),
  }
);

