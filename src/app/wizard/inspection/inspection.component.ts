
import { Component, OnInit,EventEmitter,ViewChild,Input,Output,OnChanges, SimpleChanges } from '@angular/core';
import { SohoBlockGridComponent } from 'ids-enterprise-ng';
import { HttpClient,HttpParams } from '@angular/common/http';
import { WizardDemoComponent } from 'src/app/wizard/wizard.demo';
import { InspectionService } from 'src/app/wizard/inspection/Service/inspection.service';
import { DATA} from './data';
@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {
  @ViewChild(SohoBlockGridComponent, { static: true }) blockGrid?: SohoBlockGridComponent;
  @Input() currentVISelected: any;
  @Output() newInspectionEvent:EventEmitter<any[]>= new EventEmitter<any[]>();
  Inspections : any[] |undefined=[];
  Inspection : any[] |undefined=[];
  BasicData : any[] |undefined=[];
  constructor(private InspService :InspectionService,private http: HttpClient,private WizardDemoComponent:WizardDemoComponent) { }
  public data =DATA;
  ngOnChanges(changes: SimpleChanges): void {
    this.GetInspectionselectionne()
  }
  ngOnInit(): void {
  }
  GetInspectionselectionne(){
    this.InspService.GetinspectionByMat(this.currentVISelected).then(value =>
      {
        this.BasicData = Object.entries(value).map(([type, value]) => ({type, value}));
        this.BasicData.forEach(elm => {
        
        
          this.Inspections.push (
            {
              'image' : 'https://randomuser.me/api/portraits/med/women/8.jpg' ,
              'title' :`${elm['value']['id']}`,
              'subtitle' :`${elm['value']['date_creation']}`
              
            }
          )
         })
        }
      );

  }
  ngAfterViewInit() {
    this.blockGrid?.activateBlock(1);
    this.blockGrid?.selectBlocks([3, 4, 10]);
  }
  onSelected(args: any) {
    this.WizardDemoComponent.ifInspectionSelected(true);
    this.InspService.GetInspection(args,this.BasicData,this.Inspection ).then(value => {
    this.SendCurrentInspectionIsSelected(value)
   }) ;
    
  }
  onDeselected(args: any) {
    this.WizardDemoComponent.ifInspectionSelected(false);
   }
    SendCurrentInspectionIsSelected(value) {
     
      
      this.newInspectionEvent.emit(value);
    }
    onPageSizeChange(args: any) {
    }
    onPage(args: any) {
    }
}