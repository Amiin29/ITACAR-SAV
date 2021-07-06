import {Component,HostBinding,ViewContainerRef,ViewChild,Output,EventEmitter} from '@angular/core';
import {SohoModalDialogService} from 'ids-enterprise-ng';
import { CalendarDemoService } from './calendar.demo.service';
import { SohoCalendarComponent, SohoToastService, } from 'ids-enterprise-ng';
import { event } from 'jquery';
import {UpdateRDVComponent}from './update-rdv/update-rdv.component'
import { AddRdvComponent } from './add-rdv/add-rdv.component';
import { ColorService } from '../color.service';
import { ConsultRdvComponent } from './consult-rdv/consult-rdv.component';
@Component({
  selector: 'app-calendar-demo',
  templateUrl: 'calendar.demo.html',
  providers: [CalendarDemoService]
})
export class CalendarDemoComponent 
{
  @Output() newItemEvent = new EventEmitter<any>();
  @ViewChild('dialogPlaceholder', { read: ViewContainerRef, static: true })
  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';
  placeholder?: ViewContainerRef;
  @ViewChild(SohoCalendarComponent) sohoCalendarComponent?: SohoCalendarComponent;

  constructor(private mycolor:ColorService,private modalService: SohoModalDialogService,private monthViewService: CalendarDemoService, private toastService: SohoToastService) { }
      isopen=true
      month:any
      time1:any
      time2:any
      public title = '';
      public initialMonth = 1;
      public initialYear = 2019;
      public showViewChanger = true;
      public eventTypes?: [];
      public events?: [];
      public iconTooltip = 'status';
      public eventTooltip = 'comments';
      items: any[] | undefined = [];

      ngOnInit(): void 
      {
        this.initialYear = (new Date()).getFullYear();
        this.initialMonth = (new Date()).getMonth();
        this.items=[];
      }
      ngOnDestroy(): void {
        this.items=[]  }
      public onRenderMonthCallback = (_node: Node, response: Function) => 
      {
        this.items=[];
       
        this.monthViewService.getMaintenanceOrders().then(value => //-------GetAll Maintenance Orders---------
          {

            value.forEach(val => this.items.push(Object.assign({}, val)));

            response(this.items, this.eventTypes);   
          }
      
        )      
        this.monthViewService.GetAllRdv().then(value =>   //-------------GetAllRdv----------
          {  
            console.log(new Date(value[0]['date'].substring(6,10),value[0]['date'].substring(0,2),value[0]['date'].substring(3,5),value[0]['time'].substring(0,2),value[0]['time'].substring(3,5)).toISOString())
            
            for (let i=0 ; i<value.length;i++)
            {

              this.items.push(
                {
                  "id": `${value[i]['id']}`,
                  "subject": "Discretionary Time Off",
                  "shortSubject": 'Client : '+value[i]['name'] +' | Type de service :'+value[i]['type'],
                  "comments": 'Button Gauche : Consulter un RDV  <br>Button Droite : Modifier un RDV',
                  "TypeRdv": value[i]['type'],
                  "numTel": value[i]['numTel'],
                  "location": "Us Office",
                  "status": "Approved",
                  "starts": new Date(value[i]['date'].substring(6,10),value[i]['date'].substring(0,2)-1,value[i]['date'].substring(3,5),value[i]['time'].substring(0,2),value[i]['time'].substring(3,5)).toISOString(),
                  "ends": new Date(value[i]['date'].substring(6,10),value[i]['date'].substring(0,2)-1,value[i]['date'].substring(3,5),value[i]['time'].substring(0,2),value[i]['time'].substring(3,5)).toISOString(),
                  "type": "dto",
                  "isAllDay": "true"
                }) 
            }   
            this.monthViewService.getCalendarEventTypes().subscribe((types) => 
           { 
            this.eventTypes = types;   
            });
            response(this.items, this.eventTypes);     
          });
          
     }
    onEventDblClicked(event: SohoCalendarEventClickEvent)
    {
      this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Double Clicked' });
    }

    onEventClicked(event: SohoCalendarEventClickEvent) // une click nous affiche le modal Consulter RDV
    {
      if(this.isopen)
        {
            this.isopen=false
            setTimeout(() => 
            {
              this.isopen=true
            }, 2000);
              this.mycolor.setID(event['event']['id']) 
              const dialogRef = this.modalService
              .modal<ConsultRdvComponent>(ConsultRdvComponent, this.placeholder, { fullsize: 'responsive' })
              .title(this.title)
              .buttons(
                [                 
                  {
                    text: 'Fermer', click: () => {
                      dialogRef.close('CANCEL');
                    },isDefault: false
                  },
                  {
                  },
                  {
                  
                  }
                ])

              .open();
        }
    }
    //-----------------------Click Button Droite------------------------
      onCalendarEventContextMenu(event: SohoCalendarEventClickEvent) // click droite nous affiche le modal modifier RDV
      {
        this.onRenderMonth  
        this.mycolor.setID(event['event']['id'])//id rdv
        this.ModalUpdateRDV();
      }
      ModalUpdateRDV()
        {
          const dialogRef = this.modalService
          .modal<UpdateRDVComponent>(UpdateRDVComponent, this.placeholder, { fullsize: 'responsive' })
          .title(this.title)
          .buttons(
            [ 
              {
                text: 'Fermer', click: () => 
                  {
                    dialogRef.close('CANCEL');
                  },isDefault: false
              },
              {
              },
              {
                text: 'Modifier', click: () => {
                  this.mycolor.sendEventUpdateRdv()
                  this.showToastUpdateRdv()
                  dialogRef.close('SUBMIT');
                
                //this.sohoCalendarComponent.calendarOptions()
                }, isDefault: true
              }
            ])
          .open();
        }
      //-----------------------Double Click------------------------------
  OnDbClick(event : SohoCalendarEventClickEvent){
    if (event['screenY'] > 240)
      {
        this.ModalAddRDV(); // double click nous affiche le modal ajouter RDV
      }    
  }
    ModalAddRDV() 
    {
      const dialogRef = this.modalService
      .modal<AddRdvComponent>(AddRdvComponent, this.placeholder, { fullsize: 'responsive' })
      .title(this.title)
      .buttons(
          [ 
            {
              text: 'Fermer', click: () => 
              {
                dialogRef.close('CANCEL');
              },isDefault: false
            },
            {
            },
            {
              text: 'Ajouter', click: () => 
              {
                this.mycolor.sendEventAddrdv()
                //this.showToastAddRdv()
                dialogRef.close('SUBMIT');
               
              }, isDefault: false,
              id:'sendbutton'
            }
          ])
        
        .open();
    }
    public onCalendarDateSelectedCallback = (_node: Node, args: SohoCalendarDateSelectedEvent) => {}
    onRenderMonth(event: SohoCalendarRenderMonthEvent) {}
    onSelected(event: SohoCalendarDateSelectedEvent) {}
    showToastAddRdv(position: SohoToastPosition = SohoToastService.TOP_RIGHT) 
    {
      this.toastService.show({ draggable: true, title: '', message: 'RDV Ajouté avec succès', position });
    }
    showToastUpdateRdv(position: SohoToastPosition = SohoToastService.TOP_RIGHT) 
    {
      this.toastService.show({ draggable: true, title: '', message: 'RDV Modifié avec succès', position });
      
    }
    test(){
     this.items=[];
     console.log('ppppppppppppppppppppppppppppppppppppppppppp---')
    }
  }