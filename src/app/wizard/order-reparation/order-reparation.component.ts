import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { SohoDataGridComponent,SohoToastService } from 'ids-enterprise-ng';
import { VehiculeServiceService } from 'src/app/wizard/vehicule/VehiculeService/vehicule-service.service';
import{OrderReparationService} from 'src/app/wizard/order-reparation/Service/order-reparation.service';
@Component({
  selector: 'app-order-reparation',
  templateUrl: './order-reparation.component.html',
  styleUrls: ['./order-reparation.component.css']
})
export class OrderReparationComponent implements OnInit {
  @Input() CUNO: string;
  @Input() RFIA: string;   
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
  @ViewChild('MCODatagrid') datagrid: SohoDataGridComponent;
  datagridOptions: SohoDataGridOptions;
  private pageSize = 7;

  isBusy = false;
  isDetailBusy = false;
  IfContrat =false;
  IfService =false;
  IfOrderType =false;

  created=false;
  SERN=null
  ITNO=null;
  CustomerONumber = null;
  OrderType=null;
  service=null;
  contrat=null;

  copy='1'
  defaultContrat='IC';
  defaultTypeCommande='200';
  defaultService='CHANGE_AIRMASS';



  Contrats : any[] |undefined=[];
  Services : any[] |undefined=[];
  OrderTypes : any[] |undefined=[];
  MCOs: any[] = [];
  constructor(private toastService:SohoToastService,private OrderReparationService:OrderReparationService,private VehiculeServiceService:VehiculeServiceService)
   { this.initGrid();}

  ngOnInit(): void 
  {
     this.contrat=this.defaultContrat;
     this.service=this.defaultService;
     this.OrderType=this.defaultTypeCommande;
     this.SERN=this.VehiculeServiceService.getSERN()
     this.ITNO=this.VehiculeServiceService.GetCodeVehicule()
     this.OrderReparationService.GetListContrat().then(value=>{
      if (value){         
         this.Contrats=value;
         this.IfContrat=true;
      }
      else {
         this.ToastErrorContart()         
      }
      this.OrderReparationService.GetListServices(this.ITNO).then(value=>{
         if (value){
            this.Services=value;
            this.IfService=true;
         }
         else
         {}
      })
     });
     this.OrderReparationService.GetListTypeCommandes().then(value=>{
      if (value){
         console.log(value[0]['OTTX15'])
         this.OrderTypes=value;
         this.IfOrderType=true;
      }
      else
      {}
     })
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
           width: 'auto', id: 'col-itno', field: 'PONR', name: 'Ligne',
           resizable: true, filterType: 'text', sortable: true
        },
        {
           width: 'auto', id: 'col-sern', field: 'Service', name: 'Service',
           resizable: true, filterType: 'text', sortable: true
        },
        {
         width: 'auto', id: 'col-sern', field: 'Service', name: 'Designation',
         resizable: true, filterType: 'text', sortable: true
      },
        
       ],
     dataset: [],
     emptyMessage: {
        title: 'No MCO available',
        icon: 'icon-empty-no-data'
     }
  };
  this.datagridOptions = options;
 }
 private updateGridData(data :any){
   this.datagrid ? this.datagrid.dataset = data : this.datagridOptions.dataset = data;
   
}
private setBusy(isBusy: boolean, isDetail?: boolean) 
{
   isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
}
 CreateMCO(){
   if (this.isBusy) { 
      return; 
      }
   this.setBusy(true);
    this.OrderReparationService.CreateMCO(this.CUNO,this.SERN,this.contrat,this.OrderType,this.service,this.ITNO).then(value=>{
    if(value){
      this.created=true;
      this.isBusy=false
      this.OrderReparationService.CreateLigneService(value[0]['PONR'],this.service,this.service).then(res=>{
      this.CustomerONumber = value[0]['ORNO'];
      this.updateGridData (res);
      this.ToastCreateMCO()
      console.log('------------'+this.created)
      })
            
         }
         else{
            this.setBusy(false);
         }
         })
         
 }
 AddNewMCOLine(){
   this.OrderReparationService.CreateMCOLine(this.CustomerONumber,this.service,this.SERN,this.ITNO).then(res=>{
      
      if(res){
         this.OrderReparationService.CreateLigneService(res[0]['PONR'],this.service,this.service).then(res=>{
            this.updateGridData (res);
           
            this.ToastAddNewMCOLine()
                  })
      }else{}
   })
 }
 PrintMCO(){
    
    console.log(' this.copy:'+ this.copy)
    this.OrderReparationService.PrintMCO(this.CustomerONumber,this.CustomerONumber,this.copy).then(res=>{
       if (res)
       {
          console.log('print----------')
          console.log(this.CustomerONumber)
          this.ToastPrintMCO()
        this.copy='0';
       }
       else{

       }
    })
 }
   ToastAddNewMCOLine(position: SohoToastPosition = SohoToastService.TOP_RIGHT)
      {
         this.toastService.show({ draggable: true, title: '', message: 'New MCO Line', position });
      }
 ToastPrintMCO(position: SohoToastPosition = SohoToastService.TOP_RIGHT)
      {
         this.toastService.show({ draggable: true, title: '', message: 'Document imprimé', position });
      }
   ToastCreateMCO(position: SohoToastPosition = SohoToastService.TOP_RIGHT)
      {
         this.toastService.show({ draggable: true, title: '', message: 'Ordre de maintenance client crée', position });
      }
   ToastErrorContart(position: SohoToastPosition = SohoToastService.TOP_RIGHT)
   {
      this.toastService.show({ draggable: true, title: '', message: 'Contrat non disponible', position });
   }  
   OnChangeContrat(contrat)
      {
         console.log('contrat:'+contrat)
         this.contrat=contrat;
         
      }
   OnChangeService(service)
      {
         console.log('service:'+service)
         this.service=service;
      }
   OnChangeOderType(OType)
      {
         console.log('OType:'+OType)
         this.OrderType=OType;
      }
}