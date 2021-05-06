import { Component, OnInit,Input,ViewChild } from '@angular/core';

// @ts-ignore
import { SohoPieComponent } from 'ids-enterprise-ng';
import { ColorService } from '../color.service';
@Component({
  selector: 'app-stat-by-model',
  templateUrl: './stat-by-model.component.html',
  styleUrls: ['./stat-by-model.component.css']
})
export class StatByModelComponent implements OnInit {
  

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
    data: [{
     
    }]
  }];

  constructor(private mycolor:ColorService) {}

  ngOnInit() {
   
    this.mycolor.SetOccurence().then(value => {
      this.InputModels = value;
     if (this.InputModels!=null){
       this.test=true;
      // console.log('/////'+this.InputModels[0]["QHPRNO"])
       this.pieData[0]["data"]=[];
       for (let i = 0; i < this.InputModels.length; i++){
        if (this.PData!=null){
          
          this.pieData[0]["data"].push(
            {
              name: this.InputModels[i]["QHPRNO"],
              value: this.InputModels[i]["occurrence"],
              id: 'ca',
              tooltip: this.InputModels[i]["QHPRNO"]+' <b>{{percent}}</b>'
            }
          )
     }
      }
     // console.log ("------"+this.pieData[0]["data"][0]["name"])
     }
     
 
      
    });
  
  
  }

  onRendered(event: Event) {
    console.log('Soho Radar: onRender', event);
  }

  onSelected(event: Event) {
    console.log('Soho Radar: Selected', event);
  }

  onDeselected(event: Event) {
    console.log('Soho Radar: Deselected', event);
  }


/*export class StatByModelComponent implements OnInit {
  
  constructor() {}
  ngOnInit() { 

    
  console.log('this.models'+this.InputModels.length)
    while (this.j<=this.InputModels.length) {

        this.CurrentNameModel=this.InputModels[this.j]["QHPRNO"]
          for (let i = 1; i < this.InputModels.length; i++) {
              if (this.CurrentNameModel==this.InputModels[i]["QHPRNO"]){
                this.varitem++        
              }0
              this.ListModels[i]["nom"]=this.CurrentNameModel
              this.ListModels[i]["nbr"]=this.varitem
              console.log(this.CurrentNameModel +'CurrentNameModel')

            } 
         this.j++
         //this.CurrentNameModel=""

                 
      }
      console.log(this.ListModels)
      for (let i = 1; i < this.ListModels.length; i++) {

      console.log('this.models'+this.ListModels[i])
      }
    
    }*/




    
    
    }
  

