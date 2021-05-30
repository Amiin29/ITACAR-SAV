import { Component, OnInit,Input,ViewChild } from '@angular/core';
// @ts-ignore
import { SohoPieComponent } from 'ids-enterprise-ng';
import { ColorService } from '../../color.service';
@Component({
  selector: 'app-stat-by-model',
  templateUrl: './stat-by-model.component.html',
  styleUrls: ['./stat-by-model.component.css']
})
export class StatByModelComponent implements OnInit 
{
    CurrentNameModel :any
    t =0;
    test=false;
    temp : any;;
    varitem=0
    InputModels : any[] |undefined=[];
    PData : any[] |undefined=[];
  @ViewChild(SohoPieComponent, { static: true }) sohoPieComponent?: SohoPieComponent;
  private selection: SohoPieSelected  = {index: 1};
  public pieData = [{
    data: [{}]
  }];
  constructor(private mycolor:ColorService) {}
  ngOnInit() 
    {
      this.mycolor.SetOccurence().then(value => 
        {
            this.InputModels = value;
              if (this.InputModels!=null)
                {
                  this.test=true;
                  this.pieData[0]["data"]=[];
                  for (let i = 0; i < this.InputModels.length; i++)
                    {
                      if (this.PData!=null)
                        {
                          this.pieData[0]["data"].push
                          (
                            {
                              name: this.InputModels[i]["QHPRNO"],
                              value: this.InputModels[i]["occurrence"],
                              id: 'ca',
                              tooltip: this.InputModels[i]["QHPRNO"]+' <b>{{percent}}</b>'
                            }
                          )
                        }
                    }
                }
          });
    }
    onRendered(event: Event) {}
    onSelected(event: Event) {}
    onDeselected(event: Event) {}
}
  

