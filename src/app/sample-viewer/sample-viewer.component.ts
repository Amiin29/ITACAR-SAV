import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { SohoModalDialogService } from 'ids-enterprise-ng';
import { CoreBase} from '@infor-up/m3-odin';


import { MIService} from '@infor-up/m3-odin-angular';

@Component({
   selector: 'odin-sample-viewer',
   templateUrl: './sample-viewer.component.html',
   styleUrls: ['./sample-viewer.component.css']
})
export class SampleViewerComponent extends CoreBase {
   @Input() sample: string;
   @Input() service: string;

   @ViewChild('dialogPlaceholder', { read: ViewContainerRef }) placeholder: ViewContainerRef;
   display = false;
   isBusy = false;
   items: string[] = [];

   nomClient: string;
   Adresse: string;
   Ville: string;
   Pays :string
   Etat: string;
   codePostale: string;
   Téléphone: string;
   Numero_Fax: string;
   Email: string;
   Compagnie: string;
fadeout :string
   constructor() {
      super('SampleViewerComponent');
   }
}
@Component({
   templateUrl: './sample-viewer-dialog.component.html'
   
})
export class SampleViewerDialogComponent {
   sample: string;
   service: string;

   private appName = 'soho';

   constructor() { }

  
}
