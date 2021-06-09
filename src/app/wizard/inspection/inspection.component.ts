
import { Component, OnInit,EventEmitter,ViewChild,Input,Output,OnChanges, SimpleChanges } from '@angular/core';
import { SohoBlockGridComponent } from 'ids-enterprise-ng';
import { HttpClient,HttpParams } from '@angular/common/http';
import { WizardDemoComponent } from 'src/app/wizard/wizard.demo';
import { InspectionService } from 'src/app/wizard/inspection/Service/inspection.service';
import { DATA} from './data';
import { DomSanitizer } from '@angular/platform-browser';

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
  constructor(private sanitizer: DomSanitizer,private InspService :InspectionService,private http: HttpClient,private WizardDemoComponent:WizardDemoComponent) { }
  public data =DATA;
  ngOnChanges(changes: SimpleChanges): void {
    this.GetInspectionselectionne()
  }
  ngOnInit(): void {
  }
  intervalId = setInterval(this.GetInspectionselectionne, 1000);
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  GetInspectionselectionne(){
    this.InspService.GetinspectionByMat(this.currentVISelected).then(value =>
      {
        this.BasicData = Object.entries(value).map(([type, value]) => ({type, value}));
        console.log('/////******//')
        console.log(value)
        this.BasicData.forEach(elm => {
    
          this.Inspections.push (
            {
              'image' : 'http://172.16.0.43:8081/load/'+elm['value']['medias'][0]['link'],
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
      console.log(value)
    this.SendCurrentInspectionIsSelected(value)
   }) ;
    
  }
  onDeselected(args: any) {
    this.WizardDemoComponent.ifInspectionSelected(false);
    console.log('-----------')
   }
    SendCurrentInspectionIsSelected(value) {
     
      
      this.newInspectionEvent.emit(value);
    }
    onPageSizeChange(args: any) {
    }
    onPage(args: any) {
    }
}
