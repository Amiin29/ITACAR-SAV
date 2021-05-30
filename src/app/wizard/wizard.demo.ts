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
  public buttons = [
    {
      id: 'prevous',
      text: Soho.Locale.translate('Previous'),
      click: () => this.wizard.previous(),
      disabled: () => !this.wizard.hasPrevious(),
      position: 'middle'
    },
    {
      id: 'next',
      text: Soho.Locale.translate('Next'),
      click: () => this.wizard.next(),
      isDefault: true,
      disabled: () => this.nextButtonDisabled(),
      position: 'middle'
    },
    {
      id: 'finish',
      text: 'Finish', // Soho.Locale.translate('Finish'),
      click: () => this.wizard.finish(),
      disabled: () => !this.wizard.hasFinished(),
      position: 'middle'
    }
  ];
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

     
    }
  else
    {
      this.customerIsSelected = false;
    }

  const newbutton=[...this.buttons]
  newbutton[2].disabled()
  this.buttons=newbutton
}
addItem(newItem: string) {
  this.currentItemSelected.push(newItem);
}

}
