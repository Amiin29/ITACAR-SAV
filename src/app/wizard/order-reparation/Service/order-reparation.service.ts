import { Injectable } from '@angular/core';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';

@Injectable({
  providedIn: 'root'
})
export class OrderReparationService 
{
  Contrats : any[] |undefined=[];
  Services : any[] |undefined=[];
  OrderTypes : any[] |undefined=[];
  MCO : any[] |undefined=[];
  MCOs: any[] = [];
  constructor(private miService: MIService, private userService: UserService) { }
  GetListContrat(): Promise<any>
    {   
      return new Promise((resolve, reject) => 
        {
          this.userService.getUserContext().subscribe((context) => 
              {
                this.Contrats=[];
                const inputRecord = new MIRecord();
                const request: IMIRequest = 
                  {
                    program: 'COS410MI',
                    transaction: 'LstAgreement',
                    record: inputRecord,
                    outputFields: ["AAGN", "AAGT"]
                  };
                    this.miService.execute(request).subscribe((response: IMIResponse) => {
                      if (!response.hasError()) 
                      {
                        response.items.forEach(element => {
                          if ( element['AAGN'].length != 0 &&  element['AAGT'] !=0){
                            this.Contrats.push({
                              'AAGN' : element['AAGN'],
                              'AAGT' : element['AAGT'],
                            })
                          }
                       });
                        resolve(this.Contrats)
                      } else {
                  }
                  return ;
                }, (error) => {
                  reject(error)
                });
              }, (error) => {
                reject(error)
              });
            });
          }
  GetListServices(CodeVehicule : string , Contrat : string): Promise<any>
    { 
      return new Promise((resolve, reject) => 
        {
          this.userService.getUserContext().subscribe((context) => 
            {
              const inputRecord = new MIRecord();
              const request: IMIRequest = 
                {
                  program: 'COS410MI',
                  transaction: 'LstAgrLines',
                  record: inputRecord,
                  outputFields: ["SRVP", "SUFI","PRTX","PRNO"]
                };
            this.Services =[];
            inputRecord.setString("PRNO", CodeVehicule);
            inputRecord.setString("AAGN", Contrat);
            request.record = inputRecord;
                    this.miService.execute(request).subscribe((response: IMIResponse) => 
                      {
                      if (!response.hasError()){
                         console.log(response.items)
                        for (let i=0;i<response.items.length ; i++)
                          {
                            console.log('+++++++++')
                          if (response.items[i]['PRNO'] == CodeVehicule)
                            {
                              this.Services.push({
                              'SUFI' : response.items[i]['SUFI'],
                              'TX40' : response.items[i]['PRTX'],
                              'MthdCalcul' : response.items[i]['SRVP'],
                              })
                            }
                          }
                        resolve(this.Services)
                      } else {
                      reject(null)
                  }
                  return ;
                }, (error) => {
                  console.log(error)
                  reject(error)
                });
              }, (error) => {
                reject(error)
              });
            });
          }
  GetListTypeCommandes(): Promise<any>
    {   
      return new Promise((resolve, reject) => 
        {
          this.userService.getUserContext().subscribe((context) => 
            {
              const inputRecord = new MIRecord();
              const request: IMIRequest = 
                {
                  program: 'CMS100MI',
                  transaction: 'LstCDVType',
                  record: inputRecord,
                  outputFields: ["OTAOTY","OTTX15","OTTX40"]
                };
                  this.OrderTypes=[];
                  this.miService.execute(request).subscribe((response: IMIResponse) => {
                      if (!response.hasError()) 
                      {
                        response.items.forEach(element => 
                          { 
                            this.OrderTypes.push({
                             'OTAOTY' : element['OTAOTY'],
                             'OTTX15' : element['OTTX15'],
                             'OTTX40' : element['OTTX40'],
                            })
                          });
                        resolve(this.OrderTypes)
                      } else {
                  }
                  return ;
                }, (error) => {
                  reject(error)
                });
              }, (error) => {
                reject(error)
              });
            });
      }
  CreateMCO(CUNO:string,CHASII:string,AAGN:string,AOTY:string,SUFI:string,PRNO:string): Promise<any>
    { 
      return new Promise((resolve, reject) => 
        {
          this.userService.getUserContext().subscribe((context) => 
            {
              const inputRecord = new MIRecord();
              const request: IMIRequest = 
                {
                  program: 'COS100MI',
                  transaction: 'Add',
                  record: inputRecord,
                  outputFields: ["ORNO", "PONR"]
                };
            inputRecord.setString("CONO", '860'); 
            inputRecord.setString("FACI", 'BB1');
            inputRecord.setString("STRT", '002');
            inputRecord.setString("CUNO", CUNO);
            inputRecord.setString("PRNO", PRNO);
            inputRecord.setString("BANO", CHASII);
            inputRecord.setString("AAGN", AAGN);
            inputRecord.setString("AOTY", AOTY);
            inputRecord.setString("SUFI", SUFI);
            inputRecord.setString("AURQ", '1');
            request.record = inputRecord;
            this.miService.execute(request).subscribe((M3response: IMIResponse) => {
                      if (!M3response.hasError()) 
                      {
                        resolve(M3response.items)
                      } else {
                  }
                  return ;
                }, (error) => {
                  console.log(error)
                  reject(error)
                });
              }, (error) => {
                console.log(error)

                reject(error)
              });
            });
    }
  CreateLigneService(Iscreated,PONR,ORNO,service,des): Promise<any> 
    {
      return new Promise((resolve, reject) => 
        {
            if (Iscreated){
              this.MCOs=[];
            }
              this.MCOs.push
                ({
                  'PONR' : PONR,
                  'ORNO': ORNO ,
                  'Service':service,
                  'TX40': des,
                })
                   resolve(this.MCOs);
          })
        }
        CreateMCOLine(CustomerONumber:string,IdService:string,CodeVehicule:string,BANO:string): Promise<any>
        { 
          
          return new Promise((resolve, reject) => {
          this.MCO=[];
          this.userService.getUserContext().subscribe((context) => 
            {
              const inputRecord = new MIRecord();
              const request: IMIRequest = 
                {
                  program: 'COS100MI',
                  transaction: 'AddLine',
                  record: inputRecord,
                  outputFields: ["ORNO", "PONR"]
                };
            
              console.log("ORNO", CustomerONumber+'/'+"PRNO", CodeVehicule+'/'+"BANO", BANO+'/'+"SUFI", IdService)
          inputRecord.setString("ORNO", CustomerONumber); 
          inputRecord.setString("PRNO", CodeVehicule);
          inputRecord.setString("BANO", BANO);
          inputRecord.setString("SUFI", IdService);
          inputRecord.setString("STRT", '002');
          inputRecord.setString("FACI", 'BB1');
          inputRecord.setString("AORQ", '1');
          
          request.record = inputRecord;
                  this.miService.execute(request).subscribe((response: IMIResponse) => {
                    if (!response.hasError()) 
                    {

                      this.MCO.push(response.items)
                      console.log('--------------Cretae Line')
                     console.log(response.items)
                      resolve(response.items)
                    
                    } else {
                
                }
                return ;
              }, (error) => {
                reject(error)
              });
            }, (error) => {
              reject(error)
            });
          });
        }
  PrintMCO(FORINO:string,TORINO:string,copy:string): Promise<any>
    {  
      return new Promise((resolve, reject) => 
        {
          this.userService.getUserContext().subscribe((context) => 
            {
              const inputRecord = new MIRecord();
              const request: IMIRequest = 
                {
                  program: 'COS180MI',
                  transaction: 'InvoiceProp',
                  record: inputRecord,
                 
                };
              this.MCO=[];
              inputRecord.setString("FORNO", FORINO); 
              inputRecord.setString("TORNO", TORINO);
              inputRecord.setString("IDAT", "2021/05/28"); //invoice date
              inputRecord.setString("ACDT", '2021/05/28'); //accounting date
              inputRecord.setString("PICD", '2');
              inputRecord.setString("PAIC", '1');
              inputRecord.setString("FOPRI", '0');
              inputRecord.setString("TOPRI", '0');
              request.record = inputRecord;
                  this.miService.execute(request).subscribe((response: IMIResponse) => 
                    {
                        if (!response.hasError()) {
                            this.MCO.push(response.items)
                            console.log('--------------Print')
                            console.log(response.items)
                          resolve(response.items)
                        } else {
                          }
                            return ;
                      }, (error) => {
                reject(error)
              });
            }, (error) => {
              reject(error)
            });
          });
        }
}