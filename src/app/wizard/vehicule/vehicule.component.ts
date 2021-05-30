import { Component, OnInit, ViewChild,Input, EventEmitter ,Output,ViewContainerRef} from '@angular/core';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService,SohoModalDialogService,SohoToastService } from 'ids-enterprise-ng';
import { VehiculeServiceService } from 'src/app/wizard/vehicule/VehiculeService/vehicule-service.service';
import {AddVehiculeComponent} from './add-vehicule/add-vehicule.component';
import { WizardDemoComponent } from 'src/app/wizard/wizard.demo';
import { Console } from 'node:console';

@Component({
  selector: 'vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent extends CoreBase implements OnInit {
   @Output() newVehculeEvent:EventEmitter<string>= new EventEmitter<string>();
   @Input() CUNO: string; // decorate the property with @Input()
   @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
   @ViewChild('vehiculeDatagrid') datagrid: SohoDataGridComponent;
   @ViewChild('dialogPlaceholder', { read: ViewContainerRef, static: true })
  placeholder?: ViewContainerRef;


  itemmat:any;
  itemGarantitITNO:any;
  itemGarantitSERN:any;
  itemCompteurITNO:any;
  itemCompteurSERN:any;
  
  LIRFIA
  datagridOptions: SohoDataGridOptions;
  private maxRecords = 50000;
  private pageSize = 7;
  isBusy = false;
  isDetailBusy = false;
  Vehiculs: any[] = [];
  ServiceClosed: any[] =[];
  hasSelected: boolean;
  test = false;
  constructor(private toastService:SohoToastService,private VehiculeServiceService : VehiculeServiceService,private WDC:WizardDemoComponent,private modalService: SohoModalDialogService,private miService: MIService,private miService2: MIService, private userService: UserService, private messageService: SohoMessageService) {
   super('VehiculeComponent');
      this.initGrid();
    }
  ngOnChanges(changes) {
      this.listVehicule();
      this.updateGridData();
    }
  ngOnInit(): void {  
      this.listVehicule(); 
      this.updateGridData();
      
      
     //this.mycolor.setid(this.CUNO)
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
           width: 'auto', id: 'col-itno', field: 'LIITNO', name: 'Code Voiture',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-sern', field: 'LISERN', name: 'Numéro Chasis',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-aagn', field: 'LIRFIA', name: 'Matricule',
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
        {  const request: IMIRequest = 
            {  program: 'CMS100MI',
               transaction: 'LstVehbyCus',
               outputFields: ['LICUNO', 'LIITNO', 'LISERN' ,'LIRFIA','MMITNO'],
               maxReturnedRecords: this.maxRecords
            };
            const inputrecord :MIRecord= new MIRecord();
            inputrecord.setString ('F_CUNO',this.CUNO)
            inputrecord.setString ('T_CUNO',this.CUNO)
            request.record = inputrecord;
            this.miService.execute(request).subscribe((response: IMIResponse) => 
            {
               console.log(response)
                             if (!response.hasError()) 
               {
                  this.Vehiculs = response.items;
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
   onSelected(args: any[], isSingleSelect?: boolean) 
   {
     if (this.isBusy)
        {
         return; 
        }
        const newCount = args.length;
        const selected = args && newCount === 1 ? args[0].data : null;
        this.hasSelected = !!selected;
     if (this.hasSelected)
        {
          // console.log(selected)
         this.SendCurrentVeheculeIsSelected(selected['LIRFIA']);
         this.itemGarantitITNO=selected['LIITNO']
         this.itemGarantitSERN=selected['LISERN']
         this.itemCompteurITNO=selected['LIITNO']
         this.itemCompteurSERN=selected['LISERN']
         this.VehiculeServiceService.SetSERN(selected['LISERN'])
         this.VehiculeServiceService.SetCodeVehicule(selected['LIITNO'])

          }
      }
   openFullSize() {
   const dialogRef = this.modalService
   .modal<AddVehiculeComponent>(AddVehiculeComponent, this.placeholder, { fullsize: 'responsive' })
   .title('')
     .buttons(
       [
         {
           text: 'Cancel', click: () => {
             dialogRef.close('CANCEL');
           },isDefault: false
         },
         {
         },
         {
           text: 'Submit', click: () => {
            this.VehiculeServiceService.sendEventAddVehicule()
            this.ToastAddVehicule()
             dialogRef.close('SUBMIT');
           }, isDefault: true
         }
       ])
     .open();
  }
  SendCurrentVeheculeIsSelected(value: string) {
   this.newVehculeEvent.emit(value);
 }
 ToastAddVehicule(position: SohoToastPosition = SohoToastService.TOP_RIGHT)
      {
      this.toastService.show({ draggable: true, title: '', message: 'Client Ajouté avec succès', position });
      this.listVehicule();
      }

}
