import {
  Component,
  ViewChild,Output, EventEmitter 
} from '@angular/core';
import { MIRecord } from '@infor-up/m3-odin';
import { SohoWizardComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'demo-wizard-demo',
  templateUrl: 'wizard.demo.html',
})
export class WizardDemoComponent {
  @ViewChild(SohoWizardComponent, { static: true }) wizard!: SohoWizardComponent;
  @Output() newItemEventSend = new EventEmitter<MIRecord>();
  customerIsSelected = false ;
  VehiculeIsSelected=false
  currentItemSelected2=false

  currentItemSelected ;
  selectboolean = false ;


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

  // public ticks: SohoWizardTick[] = [
  //   { label: 'Select Files', href: 'select-files', state: 'current'},
  //   { label: 'Target Folder', href: 'target-folder'},
  //   { label: 'Backup Rules', href: 'backup-rule'},
  //   { label: 'Validation', href: 'validation-rule'},
  //   { label: 'Confirmation', href: 'confirmation'},
  //   { label: 'Result', href: 'result'}
  // ];

  constructor() {
  }

  customerSelectedEvent(event: boolean){
    console.log(event)
    if(event){
      this.customerIsSelected = true;
      console.log('wizar - outputSElected '+event['OKCUNO'])
      
      this.currentItemSelected =event['OKCUNO'] ;
    }
    else{

      this.customerIsSelected = false;
    }
    console.log('this.customerIsSelected:'+this.customerIsSelected)
const newbutton=[...this.buttons]
newbutton[2].disabled()
this.buttons=newbutton
  }
  //------------------------VheiculeSelected-----------------------------------------
  VehiculeSelectedEvent(event: boolean){
    if(event){
      this.VehiculeIsSelected = true;
      //console.log('wizar - outputSElected '+event['SERN'])
      
      this.currentItemSelected =event['SERN'] ;
    }
    else{

      this.VehiculeIsSelected = false;
    }
    console.log('this.fffffffffffffff:'+this.VehiculeIsSelected)
const newbutton=[...this.buttons]
newbutton[2].disabled()
this.buttons=newbutton
  }




  nextButtonDisabled() {
    if(this.wizard.currentTickId=="app-customer" || this.wizard.currentTickId=="app-inspection"){
      console.log(this.customerIsSelected)
      console.log('88888888888888888888'+this.VehiculeIsSelected)

      if(this.customerIsSelected || this.VehiculeIsSelected){
                    return false
      }
      else
      {return true}

    }
    
  }
 

  onBeforeActivated(e: SohoWizardEvent) {
    console.log(`onBeforeActivated: The tick with the label ${e.tick.text()}`);
    console.log(e);
  }

  onActivated(e: SohoWizardEvent) {
    console.log(`onActivated: The tick with the label ${e.tick.text()}`);
    console.log(e);
  }

  onAfterActivated(e: SohoWizardEvent) {
    console.log(`onAfterActivated: The tick with the label ${e.tick.text()}`);
    console.log(e);
  }
  addNewItemToSend(value: MIRecord) {
    this.newItemEventSend.emit(value);
  }
}
