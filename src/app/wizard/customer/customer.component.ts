import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
@Component({
   templateUrl: './customer.component.html',
   styleUrls: ['./customer.css'],
   selector: 'customer',

})

export class CustomerSampleComponent extends CoreBase implements OnInit {
   gridOptions: any = null;
   @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
   @ViewChild('customersDatagrid') datagrid: SohoDataGridComponent;

   display:boolean

   datagridOptions: SohoDataGridOptions;
   items: any[] = [];
   villee: any[] = [];
   Area: any[] = [];
   customerIsSelected =false;
   new: any[] = [];
   detailItem: any;
   detailItemInfoByCustomer:any;
   detailFinancialoByCustomer:any;
   BLCD : string ;
   CUCD : string ;
   TEPY : string ;
   TXAP: string ;
   hasSelected: boolean;
   isBusy = false;
   isDetailBusy = false;
   fadeout : string
   private maxRecords = 50000;
   private pageSize = 7;
   selectedValue : any ;
   selectedValue2 : any ;
   selectedValue3 : any ;

   Custmername: string;
   Adresse1: string;
   Adresse2 :string
   Ville: string;
   pays: string;
   codePostale: string;
   num1: string;
   num2: string;
   numFaxe: string;
   Email: string;
   Compagnie: string;

   constructor(private miService: MIService,private miService2: MIService, private userService: UserService, private messageService: SohoMessageService) {
      super('CustomerSampleComponent');
      this.initGrid();
   }
   
   ngOnInit() {
   
      this.listItems();

     

   }
   private handleError2(response: IMIResponse, customer: string): void {

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
  


   private initGrid() 
   {
      
         const options: SohoDataGridOptions = {
         selectable: 'single' as SohoDataGridSelectable,
         disableRowDeactivation: true,
         clickToSelect: false,
         alternateRowShading: true,
         cellNavigation: false,
         idProperty: 'col-cuno',
         paging: true,
         rowHeight:'small' ,
         pagesize: this.pageSize,
         indeterminate: false,
         editable: true,
         filterable: true,
         showDirty: true,
         stretchColumn: 'favorite',
        
         columns: [
            {
               width: 40,  id: 'selectionCheckbox', field: '', name: '', sortable: false,
               resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox
            },
            {
               width: 'auto', id: 'col-cuno', field: 'OKCUNO', name: 'Numéro Client',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-cunm', field: 'OKCUNM', name: 'Nom',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-town', field: 'OKPHNO', name: 'Téléphone',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-cua1', field: 'OKECAR', name: 'Etat',
               resizable: true, filterType: 'text', sortable: true
            },
          
           {
               width: 'auto', id: 'col-cua1', field: 'OKPONO', name: 'Code Postale',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-cua1', field: 'OKTOWN', name: 'Ville',
               resizable: true, filterType: 'text', sortable: true
            },
         ],
         dataset: [],
         emptyMessage: {
            title: 'No customers available',
            icon: 'icon-empty-no-data'
         }
      };
      this.datagridOptions = options;
   }

   listItems() 
   {
      if (this.isBusy) 
      { 
         return; 
      }
      this.setBusy(true);
      this.userService.getUserContext().subscribe((context) => 
        {
            const request: IMIRequest = 
            {
               program: 'CMS100MI',
               transaction: 'LstCusDataGrid',
               outputFields: ['OKCUNO', 'OKCUNM', 'OKPHNO', 'OKECAR','OKPONO','OKTOWN'],
               maxReturnedRecords: this.maxRecords
            };
            const inputrecord :MIRecord= new MIRecord();

            inputrecord.setString ('F_STAT','20')
            inputrecord.setString ('T_STAT','20')
            inputrecord.setString ('F_CUTP','0')
            inputrecord.setString ('T_CUTP','8')

            request.record = inputrecord;

            this.miService.execute(request).subscribe((response: IMIResponse) => 
            {
               if (!response.hasError()) 
               {
                  this.items = response.items;
                  console.log( this.items);
                  this.updateGridData();
               } 
               else
               {
                  this.handleError('Failed to list items');
               }
               this.setBusy(false);
            }, (error) => 
            {
               this.setBusy(false);
               this.handleError('Failed to list items', error);
            });
               }, (error) => 
                  {
                     this.setBusy(false);
                     this.handleError('Failed to get user context', error);
                  });
   }

   onSelected(args: any[], isSingleSelect?: boolean) 
   {
      if (this.isBusy)
         {
          return; 
         }
         const newCount = args.length;
         const selected = args && newCount === 1 ? args[0].data : null;
         this.hasSelected = !!selected;
         console.log(selected)
      if (this.hasSelected)
         {
            this.customerIsSelected=true
           
         this.GetBasicInfoByCustomer(selected);
         this.GetDetailsByCustomer(selected);
         this.GetFinancialInfoByCustomer(selected);
         }
         else {
            this.customerIsSelected=false;
           
         }
   } 
closemodal(){
      this.fadeout="popup-fadout"
      setTimeout(()=>
      {
      this.fadeout=""
      this.display=false
      },1000)
   }

   private onClickLaunch()
   {
      this.items=[];
      this.updateGridData();
   }
   private updateGridData() 
   {
      this.datagrid ? this.datagrid.dataset = this.items : this.datagridOptions.dataset = this.items;
   }
   
   // ------------------------------------------information basique-----------------------------------------
   private GetBasicInfoByCustomer(selectedCustomer: MIRecord)
   {
      
      this.setBusy(true, true);
      const requestInfoByCustomer: IMIRequest = 
         {
            program: 'CRS610MI',
            transaction: 'GetBasicData',
            outputFields: ['CUNM', 'CUNO', 'TOWN', 'PONO', 'TFNO', 'CSCD', 'CUA1', 'PHNO']
         };
         const inputrecord : MIRecord = new MIRecord()
         inputrecord.setString('CUNO',selectedCustomer['OKCUNO'])
         requestInfoByCustomer.record = inputrecord;
      this.miService.execute(requestInfoByCustomer).subscribe((responseInfoByCustomer: IMIResponse) => 
      {
         this.setBusy(false, true);
            if (!responseInfoByCustomer.hasError()) 
            {
               this.detailItemInfoByCustomer = responseInfoByCustomer.item; 
               //console.log(' this.detailItemInfoByCustomer:'+ this.detailItemInfoByCustomer);
            } 
               else 
               {
                  this.detailItemInfoByCustomer = undefined;
                  this.handleError('Failed to get details');
               }
      }, (error) => 
      {
         this.setBusy(false, true);
         this.detailItemInfoByCustomer = undefined;
         this.handleError('Failed to get details', error);
      });
   }


  //---------------------------------------------- details  client----------------------------------------
   GetDetailsByCustomer(selectedCustomer: MIRecord)
   {
      this.setBusy(true, true);
         const request: IMIRequest = 
         {
            program: 'CMS100MI',
            transaction: 'LstCustByCUNO',
            outputFields: ['OKCUCD', 'OKSMCD', 'OKLHCD', 'OKPYCD', 'OKOKDIGC', 'OKAICD', 'OKCUCL', 'OKPLTB','OKIVGP','OKTEPY']
         };
            const CUNO = selectedCustomer['OKCUNO'];
            const inputRecord : MIRecord = new MIRecord();
            inputRecord.setString('OKCUNO',CUNO);
            request.record = inputRecord;
            this.miService.execute(request).subscribe((response: IMIResponse) => 
            {
               this.setBusy(false, true);
               if (!response.hasError()) 
               {
                  this.detailItem = response.item;
                  console.log('detailItem'+this.detailItem)
               } 
               else 
                  {
                     this.detailItem = undefined;
                     this.handleError('Failed to get details');
                  }
            }, (error) => 
            {
               this.setBusy(false, true);
               this.detailItem = undefined;
               this.handleError('Failed to get details', error);
            });
   }



   //---------------------------------------------- details  Financial ----------------------------------------
   GetFinancialInfoByCustomer(selectedCustomer: MIRecord){
      this.setBusy(true, true);
         const requestfFinancial: IMIRequest = 
         {
            program: 'CRS610MI',
            transaction: 'GetFinancial',
            outputFields: ['BLCD', 'TXAP','CUCD', 'TEPY']

         };
            const CUNO = selectedCustomer['OKCUNO'];
            const inputRecord : MIRecord = new MIRecord();
            inputRecord.setString('CUNO',CUNO);
            requestfFinancial.record = inputRecord;
            
            this.miService.execute(requestfFinancial).subscribe((responseFinancial: IMIResponse) => 
            {
               this.setBusy(false, true);
               if (!responseFinancial.hasError()) 
               {
                  this.detailFinancialoByCustomer = responseFinancial.item;
                  this.BLCD = this.detailFinancialoByCustomer['BLCD'];
                  this.CUCD = this.detailFinancialoByCustomer['CUCD'];
                  this.TEPY = this.detailFinancialoByCustomer['TEPY'];
                  this.TXAP = this.detailFinancialoByCustomer['TXAP'];

                  //console.log('detailFinancialoByCustomer'+this.detailFinancialoByCustomer['BLCD'])
               } 
               else 
                  {
                     this.detailFinancialoByCustomer = undefined;
                     this.handleError('Failed to get details');
                  }
            }, (error) => 
            {
               this.setBusy(false, true);
               this.detailFinancialoByCustomer = undefined;
               this.handleError('Failed to get details', error);
            });


   }



   private refreshGridItem(detailItem: any) 
   {
      const selected = this.datagrid.getSelectedRows()[0];
      const clone = Object.assign(selected.data, detailItem);
      this.datagrid.updateRow(selected.idx, clone);
   }

   private setBusy(isBusy: boolean, isDetail?: boolean) 
   {
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   }

   private handleError(message: string, error?: any) 
   {
         this.logError(message, error ? '- Error: ' + JSON.stringify(error) : '');
         const buttons = [{ text: 'Ok', click: (e, modal) => { modal.close(); } }];
         this.messageService.error()
         .title('An error occured')
         .message(message + '. More details might be available in the browser console.')
         .buttons(buttons)
         .open();
   }

  /* openDialog() {
      const dialogRef = this.dialog.open(DialogContentExampleDialog);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }*/



 
  modifier_client(){

  }
  
  actualiser_client(){

  }
 

 //-------------------------------chargement de TEMPLATE----------------------------------------------------
 private Getcustomertemplate (){
   const inputRecord = new MIRecord();
   inputRecord.setString("CONO", "860");
   const request: IMIRequest = {

      program: "CRS610MI",
      transaction: "LstTemplates", 
      outputFields: ["CONO", "CUNO", "CUNM"]

   };
   this.setBusy(true);
   this.miService.execute(request).subscribe((response: IMIResponse) => {
   this.setBusy(false);
      if (!response.hasError()) {
         this.items = response.items;
         const name = this.items[1]["CUNM"];
         //console.log('///////////////'+ this.items[1]['CUNO']);
         //this.logInfo("Address 2 " + address2);
      }
      else {
         this.handleError2(response,'***');
         console.log('------' + this.setBusy);
      }
   }, (response) => {
      this.setBusy(false);
      this.handleError2(response, 'customer');
   });   
 }


 //-------------------------------chargement de Ville--------------------------------------------------------------------
 GetcustomerVille(){
   const inputRecord = new MIRecord();
   inputRecord.setString("CONO", "860");
   const request: IMIRequest = {

      program: "CRS045MI",
      transaction: "LstCountry",  
      outputFields: ["CONO", "CSCD", "TX40"]

   };
   this.setBusy(true);
   this.miService.execute(request).subscribe((response: IMIResponse) => {
      this.setBusy(false);
      if (!response.hasError()) {
         this.villee = response.items;
         const name = this.villee["CSCD"];
         console.log('///////////////'+ this.villee);
         //this.logInfo("Address 2 " + address2);
      }
      else {
         this.handleError2(response,'***');
         console.log('------' + this.setBusy);
      }
      // Handle error
   }, (response) => {
      this.setBusy(false);
      this.handleError2(response, 'customer');
   }); 
  // this.getcustomercountry();  
 }
 //-------------------------------chargement de country-------------------------------------------------------

 getcustomercountry(args  : any[]){
      const inputRecord = new MIRecord();
   inputRecord.setString('CSCD', this.selectedValue2);
   console.log("CSCD--------------------", this.selectedValue2);
   const request: IMIRequest = {

      program: "CRS046MI",
      transaction: "LstAreaCodes",
      outputFields: ["ECAR", "TX15", "TX40"]

   };
   request.record = inputRecord;
   this.setBusy(true);
   this.miService.execute(request).subscribe((response: IMIResponse) => {
      this.setBusy(false);
      if (!response.hasError()) {
         this.Area = response.items;
       //  const name = this.Area["ECAR"];
         console.log('/////////////++++//'+ this.Area);
      }
      else {
         this.handleError2(response,'***');
         console.log('------' + this.setBusy);
      }
      // Handle error
   }, (response) => {
      this.setBusy(false);
      this.handleError2(response, 'customer');
   });  


 }


 ajouter_client(){
   this.display=true;
   this.Getcustomertemplate();
   this.GetcustomerVille();
   

  }
 AddCustomer(){
  
     const inputRecord = new MIRecord();
     inputRecord.setString("CUTM", this.selectedValue);
     inputRecord.setString("CUNM", this.Custmername);
     inputRecord.setString("CUA1", this.Adresse1);
     inputRecord.setString("CUA2", this.Adresse2);
     inputRecord.setString("TOWN", this.selectedValue2);
     inputRecord.setString("PONO", this.codePostale);
     inputRecord.setString("CSCD", this.selectedValue3);
     inputRecord.setString("PHNO", this.num1);
     inputRecord.setString("TFNO", this.numFaxe);
     inputRecord.setString("MAIL", this.Email);
     inputRecord.setString("STAT", '20');
     inputRecord.setString("LHCD", 'FR');
    

         const request: IMIRequest = 
         {
            program: 'CRS610MI',
            transaction: 'Add',
            record : inputRecord,
         };
         this.setBusy(true, true);

         request.record = inputRecord;
         console.log('selectedValue ----------:'+this.Custmername);

         console.log(' ----------:'+this.items);

         this.miService.execute(request).subscribe((response: IMIResponse) => 
         {
            this.setBusy(false, true);
            if (!response.hasError()) 
            {
               this.detailItem = response.item;
               console.log('detailItem'+this.detailItem)
            } 
            else 
               {
                  this.detailItem = undefined;
                  this.handleError('Failed to get details');
               }
         }, (error) => 
         {
            this.setBusy(false, true);
            this.detailItem = undefined;
            this.handleError('Failed to get details', error);
         });



}
onSelected2(args  : any[] ){
   
}

 onBeforeActivated(e: SohoWizardEvent) {
   console.log(`onBeforeActivated: The tick with the label ${e.tick.text()}`);
   console.log(e);
 }

 

 onAfterActivated(e: SohoWizardEvent) {
   console.log(`onAfterActivated: The tick with the label ${e.tick.text()}`);
   console.log(e);
 }
 
 
}


     
  /* 
   onUpdate() {
         const detailItem = this.detailItem;
         const request: IMIRequest = {
         program: 'CRS610MI',
         transaction: 'ChgBasicData',
         record: detailItem
      };
      this.setBusy(true, true);
      this.miService.execute(request).subscribe((response: IMIResponse) => {
         if (!response.hasError()) {
            this.getDetails(response.item);
            this.refreshGridItem(detailItem);
         } else {
            this.setBusy(false, true);
            this.handleError('Failed to update item');
         }
      }, (error) => {
         this.setBusy(false, true);
         this.handleError('Failed to update item', error);
      });
   }*/