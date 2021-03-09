import { Component, OnInit, ViewChild,Input, EventEmitter ,Output} from '@angular/core';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-garantit-vehicule',
  templateUrl: './garantit-vehicule.component.html',
  styleUrls: ['./garantit-vehicule.component.css']
})
export class GarantitVehiculeComponent implements OnInit {
  private pageSize = 7;
  isDetailBusy = false;
  isBusy = false;
  garantit :any[]= [];
  @Input() ITNO: any;
  @Input() SERN: any;
  STAT:any;
  CONO:any;
  WADT:any;
  WATP:any;
  PYNO:any;
  IDTY:any;
  @ViewChild('vehiculeDatagridGarantit') datagridGarantit: SohoDataGridComponent;
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
  datagridOptionsGarantit :SohoDataGridOptions;
  constructor(private miService: MIService, private messageService: SohoMessageService) { }
ngOnInit(): void {
    this.initGarantitGrid();
    this.GetGarantitVehicule();
}
  ngOnChanges(changes) {
    this.initGarantitGrid(); 
   }
  initGarantitGrid(){
    const optionsGarantit: SohoDataGridOptions = {
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
             width: 'auto', id: 'col-ITNO', field: 'ITNO', name: 'Item number',
             resizable: true, filterType: 'text', sortable: true
          },
        
          {
             width: 'auto', id: 'col-SERN', field: 'SERN', name: 'Serial no',
             resizable: true, filterType: 'text', sortable: true
          },
          {
             width: 'auto', id: 'col-MSEQ', field: 'STAT', name: 'Status',
             resizable: true, filterType: 'text', sortable: true
          },
          {
             width: 'auto', id: 'col-MSEQ', field: 'CONO', name: 'Company',
             resizable: true, filterType: 'text', sortable: true
          },
          {
           width: 'auto', id: 'col-WADT', field: 'WADT', name: 'Warranty date',
           resizable: true, filterType: 'text', sortable: true
        },
          {
             width: 'auto', id: 'col-STRT', field: 'WATP', name: 'Warranty Type',
             resizable: true, filterType: 'text', sortable: true
          },
          {
           width: 'auto', id: 'col-SUFI', field: 'PYNO', name: 'Payer',
           resizable: true, filterType: 'text', sortable: true
         },
      
        {
           width: 'auto', id: 'col-STDT', field: 'IDTY', name: 'Item type Id',
           resizable: true, filterType: 'text', sortable: true
        },
         
       ],
       dataset: [],
       emptyMessage: {
          title: 'No Garantit available',
          icon: 'icon-empty-no-data'
       }
    };
    this.datagridOptionsGarantit = optionsGarantit;
 }
//------------------------------Garantie Vehicule------------------------------------------------------------//
GetGarantitVehicule(){
  this.initGarantitGrid();
  this.setBusy(true);
       const requestInfoByGarantit: IMIRequest = 
        {
           program: 'MOS390MI',
           transaction: 'LstClaDetail',
           outputFields: [ 'ITNO' , 'IDTY','CONO','SERN','STAT','WADT','WATP','PYNO','IDTY'],
          
        };
        const inputrecord :MIRecord= new MIRecord();
        inputrecord.setString('ITNO',this.ITNO); 
        console.log('itnoooo garantit-'+this.ITNO)
        inputrecord.setString('SERN',this.SERN);
        console.log('sern garantit-'+this.SERN)
        requestInfoByGarantit.record = inputrecord;
        this.miService.execute(requestInfoByGarantit).subscribe((response: IMIResponse) => 
        {
           if (!response.hasError()) 
           {
              this.garantit = response.items;
              console.log( 'garantit-------------------'+this.garantit);
              this.updateGridGarantit();
           } 
           else
           {
              this.handleError('Failed to list  Garantit');
           }
           this.setBusy(false);
        }, (error) => 
        {
           this.setBusy(false);
           this.handleError('Failed to list  Garantit', error);
        });
}
private setBusy(isBusy: boolean, isDetail?: boolean) 
   {
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   }
updateGridGarantit() {
    this.datagridGarantit ? this.datagridGarantit.dataset = this.garantit : this.datagridOptionsGarantit.dataset = this.garantit;
   }
private handleError(message: string, error?: any) 
   {
        // this.logError(message, error ? '- Error: ' + JSON.stringify(error) : '');
         const buttons = [{ text: 'Ok', click: (e, modal) => { modal.close(); } }];
         this.messageService.error()
         .title('An error occured')
         .message(message + '. More details might be available in the browser console.')
         .buttons(buttons)
         .open();
   }
}
