import {
  Component,
  HostBinding,
  ViewContainerRef,

  ViewChild,
} from '@angular/core';
import {
  SohoModalDialogService, SohoModalDialogRef
} from 'ids-enterprise-ng';

import { CalendarDemoService } from './calendar.demo.service';
// @ts-ignore
import { SohoCalendarComponent, SohoToastService } from 'ids-enterprise-ng';
import { FullSizeModalDialogComponent } from './example-fullsize-modal.component';
import { event } from 'jquery';

@Component({
  selector: 'app-calendar-demo',
  templateUrl: 'calendar.demo.html',
  providers: [CalendarDemoService]
})


export class CalendarDemoComponent {
  @ViewChild('dialogPlaceholder', { read: ViewContainerRef, static: true })
placeholder?: ViewContainerRef;
  public title = '';

  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';
  @ViewChild(SohoCalendarComponent) sohoCalendarComponent?: SohoCalendarComponent;

  constructor(private modalService: SohoModalDialogService,private monthViewService: CalendarDemoService, private toastService: SohoToastService) { }

  public initialMonth = 1;
  public initialYear = 2019;
  public showViewChanger = true;
  public eventTypes?: [];
  public events?: [];
  public iconTooltip = 'status';
  public eventTooltip = 'comments';

  public onRenderMonthCallback = (_node: Node, response: Function) => {
    this.monthViewService.getMaintenanceOrders().then(value => {
      this.events = value;
      this.monthViewService.getCalendarEventTypes().subscribe((types) => { //The subscriber function defines how to obtain or generate values or messages to be published
        this.eventTypes = types;
        
      });
      response(this.events, this.eventTypes);
      
    });
  }
  onEventDblClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Double Clicked' });
    console.log('onEventDblClick', event);
  }

  public onCalendarDateSelectedCallback = (_node: Node, args: SohoCalendarDateSelectedEvent) => {
    console.log('onCalendarEventSelectedCallback', args);
  }

  onRenderMonth(event: SohoCalendarRenderMonthEvent) {
    console.log('onRenderMonth', event);
  }
  ngOnInit(): void {
    this.initialYear = (new Date()).getFullYear();
    this.initialMonth = (new Date()).getMonth();
  }

  onSelected(event: SohoCalendarDateSelectedEvent) {
    console.log('onSelected', event);
  }
  onEventClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({ title: 'Calendar Test onEventClicked', message: 'Event "' + event?.event?.subject + '" Clicked' });
    console.log('onEventClick--', event);
    
  }
  /*onEventDblClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Double Clicked' });
    console.log('onEventDblClick', event);
   
  }*/
  onCalendarEventContextMenu(event: SohoCalendarEventClickEvent) {
      this.toastService.show({ title: 'Calendar Test onCalendarEventContextMenu', message: 'Event "' + event?.event?.subject + '" ContextMenu' });
      console.log('onEventContextMenu', event);
    
  }
  OnDbClick($event : SohoCalendarEventClickEvent){
    console.log('MouseEvent'+event)
    if (event==null){
      console.log('---**-------')

    }
    this.openFullSize();

    console.log('----------')
    
  }
  onDbClick($event: MouseEvent) {
    console.log('onDbClick', event);

  }
  openFullSize() {
    const dialogRef = this.modalService
      .modal<FullSizeModalDialogComponent>(FullSizeModalDialogComponent, this.placeholder, { fullsize: 'responsive' })
      .title(this.title)
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
              this.AjouterRDV()
              dialogRef.close('SUBMIT');
            }, isDefault: true
          }
        ])
      
      .open();
  }

  AjouterRDV(){
    console.log('sdfsfzefzfffzf')
  }
}
