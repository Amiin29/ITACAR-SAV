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
  NumCommande=null
  isBusy = false;
  isDetailBusy = false;
  IfContrat =false;
  IfService =false;
  IfOrderType =false;
IfPrinted = false;
  created=false;
  btnMCO=false;
  SERN=null
  ITNO=null;
  CustomerONumber = null;
  OrderType=null;
  service=null;
  serviceDescription='CHANGE_AIRMASS sous garantie';
  contrat=null;

  copy='1'
  ORNO='';
  defaultContrat='IC';
  defaultTypeCommande='200';
  defaultService='CHANGE_AIRMASS';
  



  Contrats : any[] |undefined=[];
  Services : any[] |undefined=[];
  OrderTypes : any[] |undefined=[];
  Lignes: any[] = [];
  constructor(private toastService:SohoToastService,private OrderReparationService:OrderReparationService,private VehiculeServiceService:VehiculeServiceService)
   { this.initGrid();}

  ngOnInit(): void 
  {
   this.Lignes=[];
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
      this.OrderReparationService.GetListServices(this.ITNO,this.defaultContrat).then(value=>{
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
  ngOnChanges(changes) {
   this.Lignes=[];
   this.initGrid();
   this.updateGridData();
   this.CustomerONumber='';
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
         width: 'auto', id: 'col-sern', field: 'TX40', name: 'Designation',
         resizable: true, filterType: 'text', sortable: true
      },
      {
         width: 'auto', id: 'col-sern', field: 'Prix', name: 'Prix',
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
 private updateGridData(){
   this.datagrid ? this.datagrid.dataset = this.Lignes : this.datagridOptions.dataset = this.Lignes;
   
}
private setBusy(isBusy: boolean, isDetail?: boolean) 
{
   isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
}
 CreateMCO(){

   if (this.isBusy) { 
      return; 
      }
   this.Lignes=[];
   this.setBusy(true);
    this.OrderReparationService.CreateMCO(this.CUNO,this.SERN,this.contrat,this.OrderType,this.service,this.ITNO).then(value=>{
    if(value){
      this.created=true;
      this.isBusy=false
      this.btnMCO=true;
     
      
      this.OrderReparationService.CreateLigneService(this.IfPrinted,value[0]['PONR'],value[0]['ORNO'],this.service,this.serviceDescription).then(res=>{
      this.Lignes=res;
      this.CustomerONumber = value[0]['ORNO'];
      this.updateGridData ();
      this.ToastCreateMCO()
      this.ngOnInit();
      
      })
            
         }
         else{
            this.setBusy(false);
         }
         })
         
 }
 AddNewMCOLine(){
   this.OrderReparationService.CreateMCOLine(this.CustomerONumber,this.service,this.SERN,this.ITNO).then(value=>{
      
      if(value){
         this.OrderReparationService.CreateLigneService(this.IfPrinted,value[0]['PONR'],value[0]['ORNO'],this.defaultService,this.serviceDescription).then(res=>{
            this.Lignes=res;
            this.updateGridData ();
           
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
          this.IfPrinted=true;
          console.log('print----------')
          console.log(this.CustomerONumber)
          this.ngOnInit();
          this.initGrid();
         this.updateGridData();
         this.CustomerONumber='';
          this.ToastPrintMCO();
          this.btnMCO=false;
        this.copy='0';
       }
       else{

       }
       this.Lignes=[];
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
         this.Services=[];
         console.log('contrat:'+contrat)
         this.contrat=contrat;
         this.OrderReparationService.GetListServices(this.ITNO,this.defaultContrat).then(value=>{
            if (value){
               console.log(this.Services.length)
               console.log(value)
               this.Services=value;
               this.IfService=true;
            }
            else
            {}
         })
         
      }
   OnChangeService(event:Event,service)
      {
         let selectedOptions = event.target['options'];
         let selectedIndex = selectedOptions.selectedIndex;
         let selectElementText = selectedOptions[selectedIndex].text;
      
       //  console.log(service.currentTarget['options'][0]['innerHTML']);
         //console.log(service.currentTarget)
         
         this.serviceDescription=selectElementText;
         this.service=service;
         
      }
   OnChangeOderType(OType)
      {
         console.log('OType:'+OType)
         this.OrderType=OType;
      }
}