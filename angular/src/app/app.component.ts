import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoyDoc } from '@joyfill/components/dist/joyfill.min.js';

import { JoyfillService } from './joyfill.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main>
      <header>
        <button (click)="handleSave()">Save</button>
      </header> 
      <div id="joyfill-target"></div>
    </main>
  `,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  joyfillService: JoyfillService = inject(JoyfillService);
  
  identifer = '<REPLACE WITH YOUR TEMPLATE IDENTIFIER>';
  pendingTemplate = {};

  ngOnInit() {
    this.initJoyfill();
  }

  async initJoyfill() { 

    const template = await this.joyfillService.getTemplate(this.identifer);

    JoyDoc(
      document.getElementById('joyfill-target'),
      {
        doc: template,
        onChange: (changelogs, data) => {
          /**
           * changelogs - the individual changes
           * data - the entire new template with all changes applied
           */
          console.log(changelogs, data)
          this.pendingTemplate = data;
        }
      }
    );

  }

  async handleSave() {
    console.log('>>>>>>>>>>> save: ', this.pendingTemplate);
    const updatedTemplate = await this.joyfillService.updateTemplate(this.identifer, this.pendingTemplate);
    console.log('>>>>>>>>>>> updatedTemplate: ', updatedTemplate);
  }

}
