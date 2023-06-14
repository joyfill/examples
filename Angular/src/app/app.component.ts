import { Component, OnInit} from '@angular/core';
import api from '../api.js';
import Ids from '../Ids.js';
declare var JoyFill: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'joyfill';
  
  ngOnInit() {
    this.retrieveJofillDocument();
  }
  retrieveJofillDocument = async () => {

    let doc = null;
    let mode = 'edit';

    //JoyfillRetrieve api Function ...
    const response = await api.joyfillRetrieve(Ids.documentId, Ids.userAccessToken);

    console.log({response:response});
    doc = response;
  
    //JoyFill component ..
    const params = {
      mode: mode,
      doc: doc,
      onChange: (params:any, changes:any, doc:any) => {
        console.log(doc)
        doc = doc
      },
    }
    console.log(JoyFill);
    
    const joyFill = JoyFill(params);
    (<HTMLInputElement>document.getElementById("target")).appendChild(joyFill);
    
  }
}
