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
    if(event){
      this.customerIsSelected = true;
      console.log('wizar - outputSElected '+event['OKCUNO'])
      
      this.currentItemSelected =event['OKCUNO'] ;
    }
    else{
      this.customerIsSelected = false;
    }
    console.log('this.customerIsSelected:'+this.customerIsSelected)
  }
  
 
  nextButtonDisabled() {
    return this.wizard.currentTickId === 'confirmation';
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
