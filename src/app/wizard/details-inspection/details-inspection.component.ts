import { Component, OnInit,Input,SimpleChanges } from '@angular/core';
import{ServiceDetailInspectionService} from 'src/app/wizard/details-inspection/service/service-detail-inspection.service'
@Component({
  selector: 'app-details-inspection',
  templateUrl: './details-inspection.component.html',
  styleUrls: ['./details-inspection.component.css']
})
export class DetailsInspectionComponent implements OnInit {
  @Input() inspec:any
  url:any
  taille:any
  img:string;
  imgs=[];
  constructor(private ServiceDetailInspectionService:ServiceDetailInspectionService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  ngOnInit(): void 
    {
      this.imgs=[];
      this.ServiceDetailInspectionService.GetImgs(this.inspec[0]["medias"]).then(value =>{
      this.imgs=value;
      })
      
 
  }

}

