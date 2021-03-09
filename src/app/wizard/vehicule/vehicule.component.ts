import { Component, OnInit, ViewChild,Input, EventEmitter ,Output} from '@angular/core';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
import { ColorService } from 'src/app/color.service';

@Component({
  selector: 'vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent extends CoreBase implements OnInit {
   @Output() newItemEvent = new EventEmitter<MIRecord>();
  
 
 @Input() item: string;
  @Input() CUNO: string; // decorate the property with @Input()

  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
  @ViewChild('vehiculeDatagrid') datagrid: SohoDataGridComponent;
  itemGarantitITNO:any;
  itemGarantitSERN:any;
 
  itemCompteurITNO:any;
  itemCompteurSERN:any;
  MESO : any;
  MVAO: any;
  KNOW: any;
  MVAI: any;
  MVOM: any;
  INDA: any;
  TTSI: any;
  MVAX: any;
  ITNO :any;
  SERN :any;
  BIRT :any;
  STDT :any;
  STTI:any;
  STAT:any;
  CORX:any;
  CORY:any;
  CORZ:any;
  RORC:any;
  RORN:any;
  RORL:any;
  RORX:any;
  datagridOptions: SohoDataGridOptions;
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
  ServiceClosed: any[] =[];
  hasSelected: boolean;
  color
  constructor(private miService: MIService,private miService2: MIService, private userService: UserService, private messageService: SohoMessageService,private mycolor:ColorService) {
   super('VehiculeComponent');
 
   this.initGrid();
 
   
}
ngOnChanges(changes) {
   this.listVehicule(); 
}
  ngOnInit(): void {  
   this.listVehicule(); 
   this.updateGridData();
  this.color=this.mycolor.getcolor()
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
         this.itemGarantitITNO=selected['ITNO']
         this.itemGarantitSERN=selected['SERN']
         this.itemCompteurITNO=selected['ITNO']
this.itemCompteurSERN=selected['SERN']
         this.VehiculeIsSelected=true
         //this.GetMetereVehicule(selected);

         
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

}
