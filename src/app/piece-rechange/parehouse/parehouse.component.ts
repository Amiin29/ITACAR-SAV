import { Component, OnInit, ViewChild,Input, EventEmitter ,Output} from '@angular/core';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
import { ParhouseService } from './Service/parhouse.service';
import { DetailsParehouseComponent } from './details-parehouse/details-parehouse.component';
import {
   SohoModalDialogService, SohoModalDialogRef
 } from 'ids-enterprise-ng';
import { ColorService } from 'src/app/color.service';

@Component({
  selector: 'app-parehouse',
  templateUrl: './parehouse.component.html',
  styleUrls: ['./parehouse.component.css']
})
export class ParehouseComponent implements OnInit {
   @Output() newItemEvent1 = new EventEmitter<MIRecord>();
   @Output() newItemEvent2 = new EventEmitter<MIRecord>();
  @ViewChild('ParehouseDatagrid') ParehouseDatagrid: SohoDataGridComponent;
  private pageSize =7
isBusy:false
datagridOptionsParehouse :SohoDataGridOptions;
isDetailBusy = false;
pareHouse :any[]= [];
itemSelected : boolean;
title:any
itemITNO:any
itemWHLO:any
placeholder :any
items: any[] = [];
itemPareHouseITNO :any
itemPareHouseWHLO:any
hasSelected: boolean;

  @Input() ITNO: any;
  @Input() WHLO: any;

constructor(private ParhouseService:ParhouseService, private modalService: SohoModalDialogService,private miService: MIService, private messageService: SohoMessageService) {
    this.initPareHouseGrid()
   }

  ngOnChanges(changes) {
    this.initPareHouseGrid(); 
    this.GetPareHouse();
   }
  ngOnInit(): void {
    this.initPareHouseGrid();
   this.GetPareHouse();
   this.itemITNO=this.ITNO; 
   this.ParhouseService.SetIDParehouse(this.ITNO);
}
openFullSize() {
  const dialogRef = this.modalService
    .modal<DetailsParehouseComponent>(DetailsParehouseComponent, this.placeholder, { fullsize: 'responsive' })
    .title('')
    .buttons(
      [
         {
          text: 'Cancel', click: () => {
            dialogRef.close('CANCEL');
          }
        },
        { 
         
        },
        {
        }
      ])
    
    .open();
  }
initPareHouseGrid(){
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
    filterable: true,
    showDirty: true,
    stretchColumn: 'favorite',
   
        
    columns: [
           {
              width: 40,  id: 'selectionCheckbox', field: '', name: '', sortable: false,
              resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox
           },
           {
            width: 'auto', id: 'col-MBWHLO', field: 'WHLO', name: 'Code dépot',
            resizable: true, filterType: 'text', sortable: true
         },
        {
           width: 'auto', id: 'col-MBFACI', field: 'FACI', name: 'Établissement',
           resizable: true, filterType: 'text', sortable: true
        },
      
        {
           width: 'auto', id: 'col-MBWHTY', field: 'WHTY', name: 'Type de Dépot',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-MBSSQT', field: 'SSQT', name: ' Stock',
           resizable: true, filterType: 'text', sortable: true
        },
       
        {
         width: 'auto', id: 'col-MWWHNM', field: 'WHNM', name: 'Déscription',
         resizable: true, filterType: 'text', sortable: true
      },
       
       
     ],
     dataset: [],
     emptyMessage: {
        title: 'No Garantit available',
        icon: 'icon-empty-no-data'
     }
  };
  this.datagridOptionsParehouse = optionsWareHouse;
}
//------------------------------PareHouse------------------------------------------------------------//
GetPareHouse(){
  this.initPareHouseGrid();
  this.setBusy(true);
       const requestInfoByParehouse: IMIRequest = 
        {
           program: 'MMS200MI',
           transaction: 'LstItmWhsByItm',
           outputFields: ['WHLO','FACI','WHTY','SSQT','WHNM',],
          
        };
        const inputrecord :MIRecord= new MIRecord();
        inputrecord.setString('ITNO',this.ITNO); 
        
       
        requestInfoByParehouse.record = inputrecord;
        this.miService.execute(requestInfoByParehouse).subscribe((response: IMIResponse) => 
        {
           if (!response.hasError()) 
           {
              this.pareHouse = response.items;
              this.updateGridParehouse();
              
           } 
           else
           {
              this.handleError('Failed to list  Parehouse');
           }
           this.setBusy(false);
        }, (error) => 
        {
           this.setBusy(false);
           this.handleError('Failed to list  Parehouse', error);
        });
}
private setBusy(isBusy: boolean, isDetail?: boolean) 
   {
     isBusy=false
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   }
updateGridParehouse() {
    this.ParehouseDatagrid ? this.ParehouseDatagrid.dataset = this.pareHouse : this.datagridOptionsParehouse.dataset = this.pareHouse;
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
           this.openFullSize()
         this.itemSelected=true
         
         this.itemITNO=selected['ITNO']
         this.itemWHLO=selected['WHLO']
         this.ParhouseService.SetCodeWHS(this.itemWHLO);
        
         }
         else {
            this.itemSelected=false;
         }
   }
  

   
}


