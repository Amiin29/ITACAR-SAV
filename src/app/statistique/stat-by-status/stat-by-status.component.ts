import {Component,OnInit,ViewChild} from '@angular/core';
// @ts-ignore
import { SohoBarComponent } from 'ids-enterprise-ng';
import { ColorService } from '../../color.service';
@Component({
  selector: 'app-stat-by-status',
  templateUrl: './stat-by-status.component.html',
  styleUrls: ['./stat-by-status.component.css']
})
export class StatByStatusComponent implements OnInit 
{
    Orders: any[] | undefined = [];
    TabStat: any[] |undefined=[];
    status60 :any[] |undefined=[];
    status10 :any[] |undefined=[];
    TabMonth :any[] |undefined=[];
    number : any[] |undefined=[];
    number2 : any[] |undefined
    areaData:any
    Month:any
    i : any;
    j:any
    test =false
  
  CurrentYear =new Date().getFullYear();
    public barStackedData = [{   
      data: [{
        name: '01',
        value: 0
      }, {
        name: '02',
        value: 0
      }, {
        name: '03',
        value: 0,
      },
      {
        name: '04',
        value: 0
      }, {
        name: '05',
        value: 0
      }, {
        name: '06',
        value: 0,
      },
      {
        name: '07',
        value: 0
      }, {
        name: '08',
        value: 0
      }, {
        name: '09',
        value: 0,
      },
      {
        name: '10',
        value: 0
      }, {
        name: '11',
        value: 0
      }, {
        name: '12',
        value: 0,
      },
    ],
      name: 'Préliminaire'}, { //houwa mizel mebdech ema 7adher bch yetlansa 
        data: [{
          name: '01',
          value: 0
        }, {
          name: '02',
          value: 0
        }, {
          name: '03',
          value: 0,
        },
        {
          name: '04',
          value: 0
        }, {
          name: '05',
          value: 0
        }, {
          name: '06',
          value: 0,
        },
        {
          name: '07',
          value: 0
        }, {
          name: '08',
          value: 0
        }, {
          name: '09',
          value: 0,
        },
        {
          name: '10',
          value: 0
        }, {
          name: '11',
          value: 0
        }, {
          name: '12',
          value: 0,
        },
      ],
      name: 'Lancé'
    }];

  @ViewChild(SohoBarComponent, { static: true }) sohoBarComponent?: SohoBarComponent;
    public barType = 'bar-stacked';
    constructor(private mycolor:ColorService) {}
    
  ngOnInit() 
    {
      this.mycolor.getDataStatus().then(value => 
      {
            this.test =true
        for ( let i=0;i<value.length;i++)
          {
            if(this.M3DateToMonth(value[i]["date"])<=this.GetCurrentMonth())   
              {
                switch(this.M3DateToMonth(value[i]["date"])) 
                { 
                  case "01": 
                    { 
                      if ( value[i]['status'] == '10')
                        {
                          this.barStackedData[0]['data'][1]['value']++
                        }
                      else if ( value[i]['status'] == '60')
                        {
                          this.barStackedData[1]['data'][0]['value']++
                        }
                        break; 
                    } 
                  case "02": 
                    { 
                      if ( value[i]['status'] == '10')
                      {
                        this.barStackedData[0]['data'][1]['value']++
                      }
                      else if ( value[i]['status'] == '60')
                        {
                          this.barStackedData[1]['data'][1]['value']++
                        }
                      
                      break; 
                    } 
                  case "03":
                  { 
                      if ( value[i]['status'] == '10')
                      {
                        this.barStackedData[0]['data'][2]['value']++
                      }
                      else if ( value[i]['status'] == '60')
                        {
                          this.barStackedData[1]['data'][2]['value']++
                        }
                      break; 
                    } 
                  case "04": 
                    { 
                      if ( value[i]['status'] == '10')
                      {
                        this.barStackedData[0]['data'][3]['value']++
                      }
                      else if ( value[i]['status'] == '60')
                          {
                            this.barStackedData[1]['data'][3]['value']++
                          }
                        break; 
                    }
                  case "05": 
                    { 
                      if ( value[i]['status'] == '10')
                      {
                        this.barStackedData[0]['data'][4]['value']++
                      }
                    else if ( value[i]['status'] == '60')
                        {
                          this.barStackedData[1]['data'][4]['value']++
                        }
                      break; 
                    }
                  case "06": 
                    { 
                      if ( value[i]['status'] == '10')
                      {
                        this.barStackedData[0]['data'][5]['value']++
                      }
                      else if ( value[i]['status'] == '60')
                          {
                            this.barStackedData[1]['data'][5]['value']++
                          }
                        break; 
                    }
                  case "07": 
                    { 
                      if ( value[i]['status'] == '10')
                      {
                        this.barStackedData[0]['data'][6]['value']++
                      }
                      else if ( value[i]['status'] == '60')
                        {
                          this.barStackedData[1]['data'][6]['value']++
                        }
                      break; 
                    }    
                  case "08": 
                    { 
                      if ( value[i]['status'] == '10')
                      {
                        this.barStackedData[0]['data'][7]['value']++
                      }
                      else if ( value[i]['status'] == '60')
                        {
                          this.barStackedData[1]['data'][7]['value']++
                        }
                      break; 
                    } 
                  case "09": 
                  { 
                    if ( value[i]['status'] == '10')
                    {
                      this.barStackedData[0]['data'][8]['value']++
                    }
                    else if ( value[i]['status'] == '60')
                      {
                        this.barStackedData[1]['data'][8]['value']++
                      }
                    break; 
                  } 
                  case "10": 
                  { 
                    if ( value[i]['status'] == '10')
                      {
                        this.barStackedData[0]['data'][9]['value']++
                      }
                      else if ( value[i]['status'] == '60')
                      {
                        this.barStackedData[1]['data'][9]['value']++
                      }
                    break; 
                  } 
                  case "11": 
                    { 
                      if ( value[i]['status'] == '10')
                        {
                          this.barStackedData[0]['data'][10]['value']++
                        }
                      else if ( value[i]['status'] == '60')
                        {
                          this.barStackedData[1]['data'][10]['value']++
                        }
                        break; 
                    } 
                  case "12": 
                    { 
                      if ( value[i]['status'] == '10')
                        {
                          this.barStackedData[0]['data'][11]['value']++
                        }
                      else if ( value[i]['status'] == '60')
                        {
                          this.barStackedData[1]['data'][11]['value']++
                        }
                        break; 
                    } 
                    default: { break;} 
                }
              }
            
          
            
          }
          this.areaData = [];      

      })       
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
          if ( this.Month<10 ){
            return  '0'+this.Month
          }
        return this.Month
      }
    OccBystatut1(){}
}

   

