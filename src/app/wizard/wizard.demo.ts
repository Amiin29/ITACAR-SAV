import {Component,ViewChild,Output, EventEmitter } from '@angular/core';
import { MIRecord } from '@infor-up/m3-odin';
import { SohoWizardComponent,SohoToastService } from 'ids-enterprise-ng';
@Component({
  selector: 'demo-wizard-demo',
  templateUrl: 'wizard.demo.html',
})
export class WizardDemoComponent {
  @ViewChild(SohoWizardComponent, { static: true }) wizard!: SohoWizardComponent;
  @Output() newItemEventSend = new EventEmitter<MIRecord>();
  customerIsSelected = false ;
  currentCustomerSelected=null ;
  selectboolean = false ;
  InspectionIsSelected=false;
  currentVehculeSelected;
  VehiculeIsSelected=false
  currentItemSelected =null;
  inspec=null;

 constructor(private toastService:SohoToastService) {}
  nextButtonDisabled() 
  {
    if(this.wizard.currentTickId=="app-customer")
    {
      if(this.customerIsSelected){

        return false
      }
      else
      {
        return true
      }
    }
  }
 
  onBeforeActivated(e: SohoWizardEvent) {}
  onActivated(e: SohoWizardEvent) {}
  onAfterActivated(e: SohoWizardEvent) {}
 

 ifInspectionSelected(data){
   
  this.InspectionIsSelected=data;
}
ReciveIspectionSelected (event){
  if (event.length > 0){
     this.inspec =event;
  }else {
    this.InspectionIsSelected=false;
    this.toastService.show({ draggable: true, title: '', message: 'Inspection invalide' });
  }
}
ReciveSelectedVehicule (event){
  this.currentVehculeSelected =event;
if (event){
  this.VehiculeIsSelected=true;
}
}
customerSelectedEvent(event)
{
  if(event)
    {
      this.customerIsSelected = true;      
      this.currentItemSelected =event ; 
      console.log('-----------true-----------'+event)
    }
  else
    {
      this.customerIsSelected = false;
      console.log('-----------false-----------')

    }
}
addItem(newItem: string) {
  this.currentItemSelected.push(newItem);
}

}
