import { Component, OnInit, ViewChild,Input, EventEmitter ,Output} from '@angular/core';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-compteur-vehicule',
  templateUrl: './compteur-vehicule.component.html',
  styleUrls: ['./compteur-vehicule.component.css']
})
export class CompteurVehiculeComponent implements OnInit {
  @Input() ITNO: any;
  @Input() SERN: any;
  private pageSize = 7;
  isDetailBusy = false;
  isBusy = false;
  compteur : any[] = [];
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
  @ViewChild('vehiculeDatagridCompteur') datagridCompteur: SohoDataGridComponent;
  datagridOptionsCompteur: SohoDataGridOptions;

  constructor(private miService: MIService, private messageService: SohoMessageService) {  }
ngOnInit(): void {
   this.initMeterGrid(); 
   this.GetMetereVehicule();
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
        title: 'No Compteur available',
        icon: 'icon-empty-no-data'
     }
  };
  this.datagridOptionsCompteur = optionsMeter;
 }
 updateGridDataMeters() {
  this.datagridCompteur ? this.datagridCompteur.dataset = this.compteur : this.datagridOptionsCompteur.dataset = this.compteur;
}
GetMetereVehicule(){
  this.initMeterGrid();
  this.setBusy(true);
      const requestInfoByMeter: IMIRequest = 
       {
          program: 'MMS241MI',
          transaction: 'LstMeters',
          outputFields: ['MES0','MVA0','MVAI','INDA','KNOW','MV0M','RPTP','LMDT'],
          };
       const inputrecord :MIRecord= new MIRecord();
       inputrecord.setString('ITNO',this.ITNO); 
       console.log('00000000'+this.ITNO)
       inputrecord.setString('SERN',this.SERN);
       console.log(this.SERN)
       requestInfoByMeter.record = inputrecord;
       this.miService.execute(requestInfoByMeter).subscribe((response: IMIResponse) => 
       {
          if (!response.hasError()) 
          {
             this.compteur = response.items;
             console.log( this.compteur);
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
 private setBusy(isBusy: boolean, isDetail?: boolean) 
   {
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   }
   private handleError(message: string, error?: any) 
   {
         //this.logError(message, error ? '- Error: ' + JSON.stringify(error) : '');
         const buttons = [{ text: 'Ok', click: (e, modal) => { modal.close(); } }];
         this.messageService.error()
         .title('An error occured')
         .message(message + '. More details might be available in the browser console.')
         .buttons(buttons)
         .open();
   }
}
