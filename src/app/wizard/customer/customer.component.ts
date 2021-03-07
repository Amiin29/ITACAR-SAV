import { Component, OnInit, ViewChild,Output, EventEmitter } from '@angular/core';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { Console } from 'console';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
import { ColorService } from 'src/app/color.service';
@Component({
   templateUrl: './customer.component.html',
   styleUrls: ['./customer.css'],
   selector: 'customer',

})

export class CustomerSampleComponent extends CoreBase implements OnInit {
   gridOptions: any = null;
   @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
   @ViewChild('customersDatagrid') datagrid: SohoDataGridComponent;
   @Output() newItemEvent = new EventEmitter<MIRecord>();
   display=false;

   datagridOptions: SohoDataGridOptions;
   DCUNO :any;
   DCUNM : any;
   DPONO : any ;
   DTOWN : any ;
   DTFNO : any ;
   DCSCD : any ;
   DCUA1 : any ;
   DPHNO : any ;
   items: any[] = [];
   villee: any[] = [];
   Area: any[] = [];
   customerIsSelected =false;
   new: any[] = [];
   detailItem: any;
   color
  
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
   ValueOfTemplateSelected : any ;
   ValueOfTownSelected : any ;
   ValueOfAreaSelected : any ;

   Custmername: string;
   Adresse1: string;
   Adresse2 :string
   Ville: string;
   pays: string;
   codePostale: string;
   MobileNumber: string;
   num2: string;
   FaxNumber: string;
   Email: string;
   Compagnie: string;

   constructor(private miService: MIService,private miService2: MIService, private userService: UserService, private messageService: SohoMessageService ,private mycolor:ColorService) {
      super('CustomerSampleComponent');
      this.initGrid();
   }
   
   ngOnInit() {
   
      this.listItems();
      this.color=this.mycolor.getcolor()

     

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
                  //console.log( this.items);
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
        
        // console.log(selected)
      if (this.hasSelected)
         {
         this.customerIsSelected=true
         console.log(selected)
         this.addNewItem(selected);
         this.GetBasicInfoByCustomer(selected);
         this.GetDetailsByCustomer(selected);
         this.GetFinancialInfoByCustomer(selected);
         }
         else {
            this.customerIsSelected=false;
            this.addNewItem(null);
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
              
               this.DCUNO = responseInfoByCustomer.item['CUNO'];
               this.DCUNM = responseInfoByCustomer.item['CUNM'];
               this.DTOWN = responseInfoByCustomer.item['TOWN'];
               this.DPHNO = responseInfoByCustomer.item['PHNO'];
               this.DCSCD = responseInfoByCustomer.item['CSCD'];
               this.DTFNO = responseInfoByCustomer.item['TFNO'];
               this.DCUA1 = responseInfoByCustomer.item['CUA1'];
               this.DPONO = responseInfoByCustomer.item['PONO'];
              
                 console.log('-------'+this.DCUNO)
               } 
               else 
               {
                 
                  this.handleError('Failed to get details');
               }
      }, (error) => 
      {
         this.setBusy(false, true);
        
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
                 // console.log('detailItem'+this.detailItem)
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
        
         //this.logInfo("Address 2 " + address2);
      }
      else {
         this.handleError2(response,'***');
        // console.log('------' + this.setBusy);
      }
   }, (response) => {
      this.setBusy(false);
      this.handleError2(response, 'customer');
   });  
   
   //console.log('!!!!'+ this.selectedValue);
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
         console.log('///////////////---------------'+ this.villee[0]["TX40"]);
      }
      else {
         this.handleError2(response,'***');
        // console.log('------' + this.setBusy);
      }
      // Handle error
   }, (response) => {
      this.setBusy(false);
      this.handleError2(response, 'customer');
   }); 

 }


 //-------------------------------------------------------------------------------------
 
 onChangeCountry(event): void { 
   const newVal = event.target.value;
   console.log("//////////////////Country/////////////////",newVal)
   this.getCountry(newVal)
   
   
 }
 onChangeState(event): void { 
   const newVal = event.target.value;
   this.ValueOfAreaSelected = newVal;
   console.log("////////////////State///////////////////",newVal)
   
   
 }
 //-------------------------------chargement de country-------------------------------------------------------

   getCountry(ville :string){
      const inputRecord = new MIRecord();
      inputRecord.setString('CSCD', ville);
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
            //  console.log('TX40:'+ this.Area[0]['TX40']);
            console.log('ECAR:'+ this.Area[0]['ECAR']);
            this.ValueOfAreaSelected = this.Area[0]['ECAR'];

            


            }
            else {
               this.handleError2(response,'***');
            // console.log('------' + this.setBusy);
            }
            // Handle error
         }, (response) => {
            this.setBusy(false);
            this.handleError2(response, 'customer');
         });  
      //this.AddCustomer(ville)

 }


 ajouter_client(){
   this.display=true;
   this.Getcustomertemplate();
  this.GetcustomerVille()
   

  }
  
 AddCustomer(){
  
   console.log('1***ValueOfTemplateSelected*****'+this.ValueOfTemplateSelected)
   console.log('2 ***ValueOfTownSelected*****'+this.ValueOfTownSelected)
   console.log('3****ValueOfAreaSelected***'+this.ValueOfAreaSelected)
   console.log('3****codePostale***'+this.codePostale)


         const inputRecord = new MIRecord();
         const request: IMIRequest = 
         {
            program: 'CRS610MI',
            transaction: 'Add',
            record : inputRecord,
         };
        
         inputRecord.setString("CUTM", this.ValueOfTemplateSelected);
         inputRecord.setString("CUNM", this.Custmername);
         inputRecord.setString("CUA1", this.Adresse1);
         inputRecord.setString("CUA2", this.Adresse2);
         inputRecord.setString("CSCD", this.ValueOfTownSelected);
         inputRecord.setString("PONO", this.codePostale);
         inputRecord.setString("ECAR", this.ValueOfAreaSelected);
         inputRecord.setString("PHNO", this.MobileNumber);
         inputRecord.setString("TFNO", this.FaxNumber);
         inputRecord.setString("MAIL", this.Email);

         request.record = inputRecord;
         this.setBusy(true, true);

         request.record = inputRecord;
         this.miService.execute(request).subscribe((response: IMIResponse) => 
         {
            this.setBusy(false, true);
            if (!response.hasError()) 
            {
               this.detailItem = response.item;
               console.log('***********CUNO**************'+this.detailItem['CUNO'])
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

         this.listItems();
}
onSelected2(args  : any[] ){
   
}

 onBeforeActivated(e: SohoWizardEvent) {
   console.log(`onBeforeActivated: The tick with the label ${e.tick.text()}`);
  // console.log(e);
 }

 

 onAfterActivated(e: SohoWizardEvent) {
   console.log(`onAfterActivated: The tick with the label ${e.tick.text()}`);
   console.log(e);
 }
 addNewItem(value: MIRecord) {
   this.newItemEvent.emit(value);
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