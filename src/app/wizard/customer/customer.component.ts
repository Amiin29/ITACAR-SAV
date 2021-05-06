import { Component, OnInit, ViewChild,Output, ViewContainerRef,EventEmitter } from '@angular/core';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
import { ColorService } from 'src/app/color.service';
import { SohoToastService } from 'ids-enterprise-ng';

import {
   SohoModalDialogService, SohoModalDialogRef
 } from 'ids-enterprise-ng';
import { AddCustomerComponent } from './add-customer/add-customer.component';
 
//import{AddCustomerService} from './add-customer/add-cutomer-service'
@Component({
   templateUrl: './customer.component.html',
   styleUrls: ['./customer.css'],
   selector: 'customer',
})
export class CustomerSampleComponent extends CoreBase implements OnInit {
   @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
   @ViewChild('customersDatagrid') datagrid: SohoDataGridComponent;
   @ViewChild('dialogPlaceholder', { read: ViewContainerRef, static: true })
   placeholder?: ViewContainerRef;
   @Output() newItemEvent = new EventEmitter<MIRecord>();
   
   gridOptions: any = null;
   datagridOptions: SohoDataGridOptions;
   private maxRecords = 50000;
   private pageSize = 10;
   display=false;
   //title:'scsqcqq'
   itemCUNO:any
   customerIsSelected =false;
   color
   hasSelected: boolean;
   isBusy = false;
   isDetailBusy = false;
   items: any[] = [];
ngOnInit() {
      this.listItems();
   }
constructor(private toastService: SohoToastService,private modalService: SohoModalDialogService,private miService: MIService,private miService2: MIService, private userService: UserService, private messageService: SohoMessageService ,private mycolor:ColorService) {
      super('CustomerSampleComponent');
      this.initGrid();
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
ngOnChanges(changes) {
      this.listItems(); 
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
         this.customerIsSelected=true
         this.itemCUNO=selected['OKCUNO']
         this.addNewItem(selected);
         }
         else {
            this.customerIsSelected=false;
            this.addNewItem(null);
         }
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
   Modal_ajouter_client() {
      const dialogRef = this.modalService
      .modal<AddCustomerComponent>(AddCustomerComponent, this.placeholder, { fullsize: 'responsive' })
      .title('Ajouter Client')
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
               this.mycolor.sendEventAddCustomer()
               this.showToast()
                dialogRef.close('SUBMIT');
              }, isDefault: true
            }
          ])
        
        .open();
    }
    showToast(position: SohoToastPosition = SohoToastService.TOP_RIGHT) {
      this.toastService.show({ draggable: true, title: '', message: 'Client Ajouter avec succès', position });
    }

 onBeforeActivated(e: SohoWizardEvent) {
   //console.log(`onBeforeActivated: The tick with the label ${e.tick.text()}`);
 }
 onAfterActivated(e: SohoWizardEvent) {
  // console.log(`onAfterActivated: The tick with the label ${e.tick.text()}`);

   //console.log(e);
 }
 addNewItem(value: MIRecord) {
   this.newItemEvent.emit(value);
 }
  
}