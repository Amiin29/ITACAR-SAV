import { Component } from '@angular/core';

/**
 * This is an example of a simple dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: 'example-fullsize-modal.component.html'
})
export class FullSizeModalDialogComponent {
 
  onChange(_event: any) {
    console.log('in onChange');
  }
  Date(_event: any) {
    
  }

  
  public model = { // eslint-disable-line
    hhmm: '1:23 PM',
    hhmmss: '1:23:43 PM',
    HHmm24: '17:50'
  };
  public showModel = false;
}
