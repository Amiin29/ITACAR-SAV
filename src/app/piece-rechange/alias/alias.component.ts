import { Component, OnInit ,Input,ViewChild} from '@angular/core';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.css']
})
export class AliasComponent implements OnInit {

  @Input() ITNO: any;
  @ViewChild('AliasDatagrid') RelationDatagrid: SohoDataGridComponent;
  private pageSize =7
  isBusy:false
  datagridOptionsAlias :SohoDataGridOptions;
  isDetailBusy = false;
  Alias:any[]= [];
  constructor(private miService: MIService, private messageService: SohoMessageService) { }

  ngOnChanges(changes) {
    this.initAlias(); 
    this.GetAlias();
   }
  ngOnInit(): void {
    this.initAlias();
   this.GetAlias();
}
initAlias(){
  const optionsAlias: SohoDataGridOptions = {
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
           width: 'auto', id: 'col-MBITNO', field: 'ITNO', name: 'Numéro Article',
           resizable: true, filterType: 'text', sortable: true
        },
       
        {
           width: 'auto', id: 'col-MBALWT', field: 'ALWT', name: 'Catégorie références complémentaires',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-MBALWQ', field: 'ALWQ', name: 'Réference qualifier',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-MBPOPN', field: 'POPN', name: 'Numéro de réference',
           resizable: true, filterType: 'text', sortable: true
        },
        {
         width: 'auto', id: 'col-MWEOPA', field: 'EOPA', name: 'Partenaire',
         resizable: true, filterType: 'text', sortable: true
        },
        {
        width: 'auto', id: 'col-MWPRNA', field: 'PRNA', name: 'classification',
        resizable: true, filterType: 'text', sortable: true
        },
        
       ],
     dataset: [],
     emptyMessage: {
        title: 'pas de références complémentaires',
        icon: 'icon-empty-no-data'
     }
  };
  this.datagridOptionsAlias = optionsAlias;
}
//------------------------------PareHouse------------------------------------------------------------//
GetAlias(){
  this.initAlias();
  this.setBusy(true);
       const requestInfoByAlias: IMIRequest = 
        {
           program: 'MMS025MI',
           transaction: 'LstAlias',
           outputFields: [ 'ITNO' ,'ALWT','ALWQ','POPN','EOPA','PRNA'],
          
        };
        const inputrecord :MIRecord= new MIRecord();
        inputrecord.setString('ITNO',this.ITNO);        
        requestInfoByAlias.record = inputrecord;
        this.miService.execute(requestInfoByAlias).subscribe((response: IMIResponse) => 
        {
           if (!response.hasError()) 
           {
              this.Alias = response.items;
              this.updateGridAlias();
           } 
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
updateGridAlias() {
    this.RelationDatagrid ? this.RelationDatagrid.dataset = this.Alias : this.datagridOptionsAlias.dataset = this.Alias;
   }
}
