import { Component, OnInit ,Input,ViewChild} from '@angular/core';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {
  @Input() ITNO: any;
  @ViewChild('RelationDatagrid') RelationDatagrid: SohoDataGridComponent;
  private pageSize =7
  isBusy:false
  datagridOptionsRelation :SohoDataGridOptions;
  isDetailBusy = false;
  Relation :any[]= [];
  constructor(private miService: MIService, private messageService: SohoMessageService) { }

  ngOnChanges(changes) {
    this.initRelations(); 
    this.GetRelations();
   }
  ngOnInit(): void {
    this.initRelations();
   this.GetRelations();
}
initRelations(){
  const optionsWareHouse: SohoDataGridOptions = {
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
           width: 'auto', id: 'col-MBFACI', field: 'ITNO', name: 'Code article',
           resizable: true, filterType: 'text', sortable: true
        },
      
        {
           width: 'auto', id: 'col-MBWHTY', field: 'RPTY', name: 'Type de remplacement',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-MBWHSY', field: 'ALIT', name: ' Elément connexe',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-MBWHLO', field: 'INTC', name: 'Interchangeabilité',
           resizable: true, filterType: 'text', sortable: true
        },
        {
         width: 'auto', id: 'col-MWWHNM', field: 'STDT', name: 'Date Début',
         resizable: true, filterType: 'text', sortable: true
        },
        {
        width: 'auto', id: 'col-MWWHNM', field: 'RATY', name: 'Type de référence',
        resizable: true, filterType: 'text', sortable: true
        },
        {
         width: 'auto', id: 'col-MWWHNM', field: 'LMDT', name: 'Date Fin',
          resizable: true, filterType: 'text', sortable: true
        },
        {
    width: 'auto', id: 'col-MWWHNM', field: 'QAFC', name: 'Facteur de quantité',
    resizable: true, filterType: 'text', sortable: true
        },
       ],
     dataset: [],
     emptyMessage: {
        title: 'No Relation available',
        icon: 'icon-empty-no-data'
     }
  };
  this.datagridOptionsRelation = optionsWareHouse;
}
//------------------------------PareHouse------------------------------------------------------------//
GetRelations(){
  this.initRelations();
  this.setBusy(true);
       const requestInfoByParehouse: IMIRequest = 
        {
           program: 'MMS020MI',
           transaction: 'LstItemRelation',
           outputFields: [ 'ITNO' ,'RPTY','ALIT','INTC','STDT','RATY','LMDT','QAFC'],
          
        };
        const inputrecord :MIRecord= new MIRecord();
        inputrecord.setString('ITNO',this.ITNO);        
        requestInfoByParehouse.record = inputrecord;
        this.miService.execute(requestInfoByParehouse).subscribe((response: IMIResponse) => 
        {
           if (!response.hasError()) 
           {
              this.Relation = response.items;
              this.updateGridRelation();
           } 
           else
           {
           }
           this.setBusy(false);
        }, (error) => 
        {
           this.setBusy(false);
        });
}
private setBusy(isBusy: boolean, isDetail?: boolean) 
   {
     isBusy=false
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   }
updateGridRelation() {
    this.RelationDatagrid ? this.RelationDatagrid.dataset = this.Relation : this.datagridOptionsRelation.dataset = this.Relation;
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