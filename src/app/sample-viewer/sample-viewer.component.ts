import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { SohoModalDialogService } from 'ids-enterprise-ng';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';


import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';

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
   constructor(private miService: MIService,private modalService: SohoModalDialogService) {
      super('SampleViewerComponent');
   }
   private setBusy(isBusy: boolean) {
      this.isBusy = isBusy;
   }
   ngOnInit() {

      //--------------------------chargement des TEMPLATE------------------------------------
      const inputRecord = new MIRecord();
      const customer = "ACME";
      inputRecord.setString("CONO", "860");

      const request: IMIRequest = {

         program: "CRS610MI",
         transaction: "LstTemplates",
         record: inputRecord,
         outputFields: ["CONO", "CUNO", "CUNM"]

      };
      this.setBusy(true);
      this.miService.execute(request).subscribe((response: IMIResponse) => {
         this.setBusy(false);
         if (!response.hasError()) {
            this.items = response.items;
            const name = this.items[1]["CUNM"];
            console.log(name);
            //this.logInfo("Address 2 " + address2);
         }
         else {
            this.handleError(response, customer);
            console.log('------' + this.setBusy);
         }
         // Handle error
      }, (response) => {
         this.setBusy(false);
         this.handleError(response, customer);
      });
   }
   private handleError(response: IMIResponse, customer: string): void {

      this.logWarning("MI transaction " + response.transaction + " failed");

      const errorCode = response.errorCode;
      const errorField = response.errorField;
      const errorMessage = response.errorMessage;

      let message = "Unable to get basic data for customer " + customer;
      if (errorCode === "WCU0203") {
         message = "The customer " + customer + " does not exist";
      }
      this.logError(message + " " + errorMessage);
   }

   ajouter_client(){
      this.display=true;
      }
      addcustomer(){
         const inputRecord = new MIRecord();
         inputRecord.setString("CUTM", this.items["CUTM"]);
         inputRecord.setString("CUNM", this.nomClient);
         inputRecord.setString("CUA1", this.Adresse);
         inputRecord.setString("TOWN", this.Ville);
         inputRecord.setString("ECAR", this.Etat);
         inputRecord.setString("PONO", this.codePostale);
         inputRecord.setString("PHNO", this.Téléphone);
         inputRecord.setString("MAIL", this.Email);
         inputRecord.setString("TFNO", this.Numero_Fax);
         inputRecord.setString("CONO", this.Compagnie);
   
         const request: IMIRequest = {
            program: "CRS610MI",
            transaction: "Add",
            record: inputRecord,
         };
         this.setBusy(true);
         this.miService.execute(request).subscribe((response: IMIResponse) => {
            this.setBusy(false);
   
            console.log('-------------------------------' + response.errorCode);
            if (!response.hasError()) {
               const record: MIRecord = response.item as MIRecord;
               const CUNM = record["CUNM"];
               const ERRM = record["ERRM"];
               console.log("---------yesss---- " + CUNM);
   
               this.logInfo("CUNM " + CUNM);
               console.log("Errors " + ERRM);
            }
            else {
               this.handleError(response, response.error);
               console.log('-----------------------------' + this.setBusy);
            }
            // Handle error
         }, (response) => {
            this.handleError(response, "customer");
            this.setBusy(false);
         });     
      }
   closemodal(){
      this.fadeout="popup-fadout"
      setTimeout(()=>{
   this.fadeout=""
   this.display=false
      },1000)
      }
   openDialog() {
      const buttons = [{ text: 'Close', click: (e, modal) => { modal.close(); }, isDefault: true }];
      const dialogRef = this.modalService.modal<SampleViewerDialogComponent>(SampleViewerDialogComponent, this.placeholder)
         .id('sample-viewer-modal')
         .title(`Ajouter un Client `)
         .buttons(buttons)
         .apply((dialogComponent) => {
            dialogComponent.sample = this.sample;
            dialogComponent.service = this.service;
         });
      dialogRef.open();
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

   getSampleUrl(extension: string) {
      return `assets/source/${this.appName}-app/samples/${this.sample}/${this.sample}.component.${extension.toLowerCase()}`;
   }

   getServiceUrl() {
      return `assets/source/${this.appName}-app/samples/${this.sample}/${this.service}.service.ts`;
   }
}
