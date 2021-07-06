import {Component,Input,OnInit,ViewChild} from '@angular/core';
import { ColorService } from '../../color.service';//CMS015
import {SohoLineComponent} from 'ids-enterprise-ng';
@Component({
  selector: 'app-ordre-travail-mois',
  templateUrl: './ordre-travail-mois.component.html',
  styleUrls: ['./ordre-travail-mois.component.css']
})
export class OrdreTravailMoisComponent implements OnInit 
{
  changed:boolean
  @Input() InputOrders : any[] ;
  Orders: any[] | undefined = [];
  number : any[] |undefined=[];
  tab : any[] |undefined=[];
  Month:number;
  CurrentYear =new Date().getFullYear();
  test = false;
  areaData : any
  NewDate:string
  @ViewChild(SohoLineComponent, { static: true }) sohoLineComponent?: SohoLineComponent;
  constructor(private mycolor:ColorService) {}
    ngOnInit() 
      {
            this.tab=[]
            this.mycolor.SetOccurenceDate().then(value => 
              {
                this.test=true;
                for (let i=0;i<value.length;i++)
                  {
                    if(this.M3DateToYear(value[i]["QHSTDT"])==this.CurrentYear.toString() && this.M3DateToMonth(value[i]["QHSTDT"])<=this.GetCurrentMonth())
                    {
                      value.sort((a, b) => a.QHSTDT.valueOf() - b.QHSTDT.valueOf())
                      switch(this.M3DateToMonth(value[i]["QHSTDT"])) 
                      { 
                          case "01": 
                          { 
                            this.tab.push(
                              {
                              "name":"Janvier",
                              "value":value[i]["occurrence"]
                              })
                              break; 
                          } 
                          case "02": 
                          { 
                            this.tab.push(
                              {
                                "name":'Février',
                                "value":value[i]["occurrence"]
                              })
                            break; 
                          } 
                          case "03": 
                          { 
                            this.tab.push(
                              {
                                "name":'Mars',
                                "value":value[i]["occurrence"]
                              })
                            break; 
                          } 
                          case "04": 
                          { 
                              this.tab.push(
                                {
                                  "name":'Avril',
                                  "value":value[i]["occurrence"]
                                })
                              break; 
                            } 
                          case "05": 
                            { 
                              this.tab.push(
                                {
                                  "name":'Mai',
                                  "value":value[i]["occurrence"]
                                })
                              break; 
                            } 
                        case "06": 
                          { 
                            this.tab.push(
                              {
                                "name":'Juin',
                                "value":value[i]["occurrence"]
                              })
                            break; 
                          } 
                        case "07": 
                          { 
                            this.tab.push(
                              {
                              "name":'Juillet',
                                "value":value[i]["occurrence"]
                              })
                            break; 
                          } 
                      case "08": 
                        { 
                          this.tab.push(
                            {
                                "name":'Aout',
                                "value":value[i]["occurrence"]
                              })
                          break; 
                        } 
                      case "09": 
                      { 
                        this.tab.push(
                          {
                            "name":'Septembre',
                            "value":value[i]["occurrence"]
                          })
                        break; 
                      } 
                      case "10": 
                      { 
                        this.tab.push(
                          {
                            "name":'Octobre',
                            "value":value[i]["occurrence"]
                          })
                        break; 
                      }  
                      case "11": 
                      { 
                        this.tab.push(
                          {
                            "name":'Novembre',
                            "value":value[i]["occurrence"]
                          })
                        break; 
                      } 
                      case "12": 
                      { 
                        this.tab.push(
                          {
                            "name":'Decembre',
                            "value":value[i]["occurrence"]
                          })
                        break; 
                          } 
                            default: { 
                            break; 
                          } 
                      }  
                    }
                  }
              })

          this.areaData = 
          [{
            data:this.tab
          }];
       }

    public M3DateToYear (M3Date : string){
        return M3Date.slice(0, 4)
      }
    public M3DateToDay (M3Date : string){
        return M3Date.slice(6, 8)
      }
    public M3DateToMonth (M3Date : string){
        return M3Date.slice(4, 6)
      }
      public GetCurrentMonth ()
      {
        this.Month=new Date().getMonth()+1;
          if ( this.Month<10 )
          {
            return  '0'+this.Month
          }
        return this.Month
      }
      
}
