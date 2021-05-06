import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { promise } from 'selenium-webdriver';
@Injectable({
  providedIn: 'root'
})
export class ColorService {
  CurrentNameModel :any
  t =0;
  test=false;
  temp : any;;
  varitem=0
  PData : any[] |undefined=[];
  Tab : any[] |undefined=[];
  TabStat: any[] |undefined=[];
  Tab2 : any[] |undefined=[];
  Tab3 : any[] |undefined=[];
Orders: any[] = [];
DataStatus: any[] |undefined=[];
Status : any[] |undefined=[];
CurrentYear =new Date().getFullYear();
Month:number
 theme={
  color:''
}
  constructor(private miService: MIService, private userService: UserService) { }
  setcolro(color){
    this.theme.color=color
  }
  
  getcolor(){
    return this.theme
  }
/*
//-----------------------------------------------OccByStatut--------------
OccBystatut(): Promise<any>{
  return new Promise((resolve, reject) => {
    this.Orders.forEach((x2)=>{
      if(this.TabStat.some((val2)=>{ 
        console.log(this.Orders)

        return   val2["QHWHST"] == x2["QHWHST"]
      })){
          this.TabStat.forEach((k2)=>{  
            if(k2["QHWHST"] === x2["QHWHST"] ){ 
              k2["occurrence"]++
            }
        }) 
      }
      else{
        let a2 = {}
        a2["QHWHST"] = x2["QHWHST"]
        a2["occurrence"] = 1
        this.TabStat.push(a2);
      }   
  })
  if (this.TabStat !=null) {
    resolve(this.TabStat)
    console.log('++++++---+++++')
        console.log( this.TabStat)  
          console.log('+++++++++++')
  } else {
    reject(null)
  }
})

}*/
  private subject = new Subject<any>();

  sendEventAddCustomer() {
  this.subject.next();
}
getAddCustomer(): Observable<any>{ 
  return this.subject.asObservable();
  
}
//------------------------------------
getMaintenanceOrders(): Promise<any>{
  const inputRecord = new MIRecord();
  return new Promise((resolve, reject) => {
    this.userService.getUserContext().subscribe((context) => {
      const request: IMIRequest = {
        program: 'CMS100MI',
        transaction: 'LstOrByYear',
        record: inputRecord,
        outputFields: ["QHSTDT", "QHFIDT", "QHWHST", "QHMWNO","QHPRNO","MMIITNO","MMITDS"]
      };
      this.miService.execute(request).subscribe((response: IMIResponse) => {
        if (!response.hasError()) {
          this.Orders = response.items;
         

          resolve(this.Orders)
        console.log( this.Orders)
        } else {
          this.Orders=null;
        }
       // this.setBusy(false);
        return ;
      }, (error) => {
        reject(error)
        //this.setBusy(false);
      });
    }, (error) => {
      reject(error)
      //this.setBusy(false);
    });
  });
}

getDataStatus(): Promise<any>{
  const inputRecord = new MIRecord();
  return new Promise((resolve, reject) => {
    this.userService.getUserContext().subscribe((context) => {
      const request: IMIRequest = {
        program: 'CMS100MI',
        transaction: 'LstOrByYear',
        record: inputRecord,
        outputFields: ["QHSTDT", "QHFIDT", "QHWHST", "QHMWNO","QHPRNO","MMIITNO","MMITDS"]
      };
      this.miService.execute(request).subscribe((response: IMIResponse) => {
        if (!response.hasError()) {
          this.Orders = response.items;
          
          for (let i=0;i< this.Orders.length;i++){
           
            if (this.M3DateToYear(this.Orders[i]["QHSTDT"])==this.CurrentYear.toString() && this.M3DateToMonth(this.Orders[i]["QHSTDT"])<=this.GetCurrentMonth()){
          
            this.DataStatus.push({
              "date": this.Orders[i]["QHSTDT"],
              "status":this.Orders[i]["QHWHST"]
            })}

            
          }
          this.DataStatus.sort((a, b) => a.date.valueOf() - b.date.valueOf())
          resolve(this.DataStatus)
        
        } else {
          this.DataStatus=null;
        }
       // this.setBusy(false);
        return ;
      }, (error) => {
        reject(error)
        //this.setBusy(false);
      });
    }, (error) => {
      reject(error)
      //this.setBusy(false);
    });
  });
}
public GetCurrentMonth (){

    
  this.Month=new Date().getMonth()+1;
  if ( this.Month<10 ){
    return  '0'+this.Month
  }
  return this.Month
  }
SetOccurenceDate(): Promise<any>{

  return new Promise((resolve, reject) => {
    
    this.Orders.forEach((x1)=>{
      if(this.Tab2.some((val1)=>{ 
       
        return    this.M3DateToYear(val1["QHSTDT"]) == this.M3DateToYear(x1["QHSTDT"]) && this.M3DateToMonth(val1["QHSTDT"])==this.M3DateToMonth(x1["QHSTDT"])
      })){
          this.Tab2.forEach((k1)=>{
            
            if(this.M3DateToYear(k1["QHSTDT"]) === this.M3DateToYear(x1["QHSTDT"]) && this.M3DateToMonth(k1["QHSTDT"]) == this.M3DateToMonth(k1["QHSTDT"] )){ 
              
              k1["occurrence"]++
            }
        }) 
      }
      else{
       
        let a1 = {}
        a1["QHSTDT"] = x1["QHSTDT"]
        a1["occurrence"] = 1
        this.Tab2.push(a1);
      }   
  })

 
  if (this.Tab2 !=null) {
    
     
    resolve(this.Tab2)
  } else {
    
    reject(null)
  }
})
}
//---------------------------------------OccByModel--------------------------------------
SetOccurence(): Promise<any>{


  return new Promise((resolve, reject) => {
  this.Orders.forEach((x)=>{
      if(this.Tab.some((val)=>{ 
        return val["QHPRNO"] == x["QHPRNO"] })){
        this.Tab.forEach((k)=>{
          if(k["QHPRNO"] === x["QHPRNO"]){ 
            k["occurrence"]++
          }
      })         
      }
      else{
        let a = {}
        a["QHPRNO"] = x["QHPRNO"]
        a["occurrence"] = 1
        this.Tab.push(a);
      }   
  })
 
  if (this.Tab !=null) {
    resolve(this.Tab)
  } else {
    
    reject(null)
  }
})
}


SetOccurenceMonthByStatus(month : any,m :any): Promise<any>{

  this.Tab=[];
  for (let i=0;i< month.length;i++){
    console.log('---------:'+month[i]['status']+':'+month[i]['date'])
  }
  console.log(this.Tab.length);
  return new Promise((resolve, reject) => {
  month.forEach((xx)=>{
      if(this.Tab3.some((valx)=>{ 
        console.log('///////////////');
        return valx["status"].valueOf() == xx["status"].valueOf() })){
        
        this.Tab3.forEach((p)=>{
          if(p["status"] === xx["status"]){ 
            p["occurrence"]++
            p["month"]=m
          }
      })         
      }
      else{
        let a = {}
        a["status"] = xx["status"]
        a["occurrence"] = 1
        a["month"]=m
        this.Tab3.push(a);
      }   
  })
 
  if (this.Tab3 !=null) {
    resolve(this.Tab3)
  } else {
    
    reject(null)
  }
})
}







OccBystatut2(){
  
  return new Promise((resolve, reject) => {
    this.Orders.forEach((x2)=>{
      if(this.TabStat.some((val2)=>{     
        return   val2["QHWHST"] == x2["QHWHST"]
      })){
          this.TabStat.forEach((k2)=>{  
            if(k2["QHWHST"] === x2["QHWHST"] ){ 
              k2["occurrence"]++
            }
        }) 
      }
      else{
        let a2 = {}
        a2["QHWHST"] = x2["QHWHST"]
        a2["occurrence"] = 1
        this.TabStat.push(a2);
      }   
  })
  if (this.TabStat !=null) {
    resolve(this.TabStat)

  } else {
    reject(null)
  }

})

}


public M3DateToYear (M3Date : string){
  return M3Date.slice(0, 4)
  }
  public M3DateToMonth (M3Date : string){
  
    return M3Date.slice(4, 6)
    }
}
