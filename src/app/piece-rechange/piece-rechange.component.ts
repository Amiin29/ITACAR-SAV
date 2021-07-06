import { Component, OnInit ,ViewChild} from '@angular/core';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
import {SohoModalDialogService} from 'ids-enterprise-ng';
@Component({
  selector: 'app-piece-rechange',
  templateUrl: './piece-rechange.component.html',
  styleUrls: ['./piece-rechange.component.css']
})
export class PieceRechangeComponent extends CoreBase implements OnInit {
  @ViewChild('PieceRechangeDatagrid') datagrid: SohoDataGridComponent;
  private maxRecords = 50000;
  datagridOptions: SohoDataGridOptions;
  itemSelected : boolean;
  isBusy = false;
  private pageSize = 10;
  isDetailBusy = false;
  items: any[] = [];
  itemSTAT: any[] = [];
  itemPareHouseITNO :any
  itemDetailsPareHouseITNO:any
  itemRelation:any
  itemAlias:any
  hasSelected: boolean;
  constructor(private modalservice :SohoModalDialogService,private userService: UserService,private miService: MIService) {
    super('PieceRechangeComponent');
    this.initGrid();
  }
  ngOnInit() {
       this.listItems();
  }

  ngOnChanges(changes) {
      this.listItems();
  }

  private setBusy(isBusy: boolean, isDetail?: boolean) 
  {
     isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
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
        paging:true,
        rowHeight:'small',
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
              width: 'auto', id: 'col-ITNO', field: 'ITNO', name: 'Article',
              resizable: true, filterType: 'text', sortable: true
           },
           {
              width: 'auto', id: 'col-ITDS', field: 'ITDS', name: 'Nom',
              resizable: true, filterType: 'text', sortable: true
           },
           {
              width: 'auto', id: 'col-ITTY', field: 'ITTY', name: 'Type',
              resizable: true, filterType: 'text', sortable: true
           },
           {
            width: 'auto', id: 'col-SPRB', field: 'SPRB', name: 'Prix de Vente ',
            resizable: true, filterType: 'text', sortable: true
         },
         {
            width: 'auto', id: 'col-PPRB', field: 'PPRB', name: 'Prix d Achat',
            resizable: true, filterType: 'text', sortable: true
         },
           {
              width: 'auto', id: 'col-STAT', field: 'STAT', name: 'Statut',
              resizable: true, filterType: 'text', sortable: true
           },
         
        ],
        dataset: [],
        emptyMessage: {
           title: 'No parts available',
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
               program: 'MMS200MI',
               transaction: 'SelItem',
               outputFields: ['ITNO', 'ITDS', 'ITTY', 'SPRB','PPRB','STAT'],
               maxReturnedRecords: this.maxRecords
            };
            const inputrecord :MIRecord= new MIRecord();
            request.record = inputrecord;
            this.miService.execute(request).subscribe((response: IMIResponse) => 
            {
               if (!response.hasError()) 
               {
                  
                  this.items = response.items;
                  this.items=  this.items.filter(data=>data.STAT==20)
                  this.items.forEach(element => {
                  this.itemSTAT.push({
                      "ITNO":element.ITNO,
                      "ITDS":element.ITDS,
                      "ITTY":element.ITTY,
                      "SPRB":element.SPRB,
                      "PPRB":element.PPRB,
                      "STAT":"Approuvé"


                   })
                   
                });
                  this.updateGridData();
               } 
               else
               {
               }
               this.setBusy(false);
            }, (error) => 
            {
               this.setBusy(false);
            });
               }, (error) => 
                  {
                     this.setBusy(false);
                  });
                  
   }
   private updateGridData() 
   {
      this.datagrid ? this.datagrid.dataset = this.itemSTAT : this.datagridOptions.dataset = this.itemSTAT;
   }

   onSelected(args: any[], isSingleSelect?: boolean) 
   {
     // if (this.isBusy)
       //  {
        //  return; 
        // }
         const newCount = args.length;
         const selected = args && newCount === 1 ? args[0].data : null;
         this.hasSelected = !!selected;
        
      if (this.hasSelected)
         {
            
         this.itemSelected=true
         this.itemPareHouseITNO=selected['ITNO']
         this.itemRelation=selected['ITNO']
         this.itemAlias=selected['ITNO']
         }
         else {
            this.itemSelected=false;
         }
   } 
}
