import { Component, OnInit, ViewChild,Input, EventEmitter } from '@angular/core';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';

@Component({
  selector: 'vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent extends CoreBase implements OnInit {
  @Input() CUNO: string; // decorate the property with @Input()

  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
  @ViewChild('vehiculeDatagrid') datagrid: SohoDataGridComponent;
  @ViewChild('vehiculeDatagridMeters') datagridMeters: SohoDataGridComponent;
  MESO : any;
  MVAO: any;
  KNOW: any;
  MVAI: any;
  MVOM: any;
  INDA: any;
  TTSI: any;
  STDT: any;
  STTI: any;
  MVAX: any;
  ITNO :any
  SERN :any
  datagridOptions: SohoDataGridOptions;
  datagridOptionsMeters: SohoDataGridOptions;
  private maxRecords = 50000;
  private pageSize = 7;
  isBusy = false;
  VehiculeIsSelected = false
  display=false;
  fadeout:string;
  display1=false;
  fadeout1:string;
  display2=false;
  fadeout2:string;
  isDetailBusy = false;
  Vehiculs: any[] = [];
  meters : any[] = [];
  hasSelected: boolean;
  
  constructor(private miService: MIService,private miService2: MIService, private userService: UserService, private messageService: SohoMessageService) {
   super('VehiculeComponent');
 
   this.initGrid();
   this.initMeterGrid();
}
ngOnChanges(changes) {
   this.listVehicule(); 
 }
  ngOnInit(): void {  
   this.listVehicule(); 
   this.updateGridData();
  
  }
  initMeterGrid() {
    
   const optionsMeter: SohoDataGridOptions = {
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
     
     showDirty: true,
     stretchColumn: 'favorite',
    
     columns: [
       
         {
           width: 'auto', id: 'col-meso', field: 'MES0', name: 'Meter',
           resizable: true, filterType: 'text', sortable: true
        },
      
        {
           width: 'auto', id: 'col-mva0', field: 'MVA0', name: 'Depuis nouveau',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-mvai', field: 'MVAI', name: 'Valeur compteur à linstallation du composant',
           resizable: true, filterType: 'text', sortable: true
        },
        {
         width: 'auto', id: 'col-inda', field: 'INDA', name: 'date de linstallation',
         resizable: true, filterType: 'text', sortable: true
      },
        {
           width: 'auto', id: 'col-know', field: 'KNOW', name: 'valeur estimée compteur',
           resizable: true, filterType: 'text', sortable: true
        },
        {
         width: 'auto', id: 'col-mv0m', field: 'MV0M', name: 'valeur compteur à linstallation Op',
         resizable: true, filterType: 'text', sortable: true
       },
      {
         width: 'auto', id: 'col-aagn', field: 'RPTP', name: 'Type de rapport',
         resizable: true, filterType: 'text', sortable: true
      },
      {
         width: 'auto', id: 'col-aagn', field: 'LMDT', name: 'Date de modification',
         resizable: true, filterType: 'text', sortable: true
      },
       
     ],
     dataset: [],
     emptyMessage: {
        title: 'No Vehicul available',
        icon: 'icon-empty-no-data'
     }
  };
  this.datagridOptionsMeters = optionsMeter;
 }
  initGrid() {
    
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
           width: 'auto', id: 'col-mlyr', field: 'CUNO', name: 'Customer number',
           resizable: true, filterType: 'text', sortable: true
        },
      
        {
           width: 'auto', id: 'col-itno', field: 'ITNO', name: 'Code Voiture',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-sern', field: 'SERN', name: 'Numéro Chasis',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-aagn', field: 'MLYR', name: 'Anneé',
           resizable: true, filterType: 'text', sortable: true
        },
       
     ],
     dataset: [],
     emptyMessage: {
        title: 'No Vehicul available',
        icon: 'icon-empty-no-data'
     }
  };
  this.datagridOptions = options;
 }
  
   listVehicule() {
      if (this.isBusy) 
      { 
         return; 
      }
      this.setBusy(true);
      this.userService.getUserContext().subscribe((context) => 
        {
            const request: IMIRequest = 
            {
               program: 'MMS240MI',
               transaction: 'LstByCustomer',
               outputFields: ['CUNO', 'ITNO', 'SERN' ,'MLYR'],
               maxReturnedRecords: this.maxRecords
            };
            const inputrecord :MIRecord= new MIRecord();

            inputrecord.setString ('CUNO',this.CUNO)
            

            request.record = inputrecord;

            this.miService.execute(request).subscribe((response: IMIResponse) => 
            {
               if (!response.hasError()) 
               {
                  this.Vehiculs = response.items;
                  console.log( "this.Vehiculs", this.Vehiculs  );
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
   updateGridData() {
      this.datagrid ? this.datagrid.dataset = this.Vehiculs : this.datagridOptions.dataset = this.Vehiculs;
   }
   updateGridDataMeters() {
      this.datagridMeters ? this.datagridMeters.dataset = this.meters : this.datagridOptionsMeters.dataset = this.meters;
   }
  
   private setBusy(isBusy: boolean, isDetail?: boolean) 
   {
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   }
  customerSelectedEventVehicule(event: boolean){

    console.log('wizar - outputSElected '+event['OKCUNO'])
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
         this.VehiculeIsSelected=true
         this.GetMetereVehicule(selected);
       
        }
        else {
         
        }
  }
  ajouterVehicule(){
     this.display=true;
  }

  closemodal(){
   this.fadeout="popup-fadout"
setTimeout(()=>{
this.fadeout="";
this.display=false;
},1000)
}
  ajouterOperation(){
     this.display1=true;
  }
  closemodal1(){
   this.fadeout1="popup-fadout"
setTimeout(()=>{
this.fadeout1="";
this.display1=false;
},1000)
}
ajouterReclamation(){this.display2=true;}
closemodal2(){
   this.fadeout2="popup-fadout"
setTimeout(()=>{
this.fadeout2="";
this.display2=false;
},1000)
}

  
  //----------------------------------------Meter reading ---------------------------------------
  GetMetereVehicule(selectedVehicule: MIRecord){
    
   this.initMeterGrid();
   this.setBusy(true);
  
         const requestInfoByMeter: IMIRequest = 
         {
            program: 'MMS241MI',
            transaction: 'LstMeters',
            outputFields: ['MES0','MVA0','MVAI','INDA','KNOW','MV0M','RPTP','LMDT'],
            
         };
         const inputrecord :MIRecord= new MIRecord();

         inputrecord.setString('ITNO',selectedVehicule ['ITNO']); 
         console.log(selectedVehicule ['ITNO'])

         inputrecord.setString('SERN',selectedVehicule ['SERN']);
         console.log(selectedVehicule ['SERN'])
         requestInfoByMeter.record = inputrecord;

         this.miService.execute(requestInfoByMeter).subscribe((response: IMIResponse) => 
         {
            if (!response.hasError()) 
            {
               this.meters = response.items;
               console.log( this.meters);
               this.updateGridDataMeters();
            } 
            else
            {
               this.handleError('Failed to list meters');
            }
            this.setBusy(false);
         }, (error) => 
         {
            this.setBusy(false);
            this.handleError('Failed to list items', error);
         });
   
 

           
         
} 





}
