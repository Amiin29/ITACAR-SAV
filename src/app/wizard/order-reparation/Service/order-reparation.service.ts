import { Injectable } from '@angular/core';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { curveMonotoneX } from 'd3-shape';
import { Console } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class OrderReparationService {
  Contrats : any[] |undefined=[];
  Services : any[] |undefined=[];
  OrderTypes : any[] |undefined=[];
  MCO : any[] |undefined=[];
  MCOs: any[] = [];
  constructor(private miService: MIService, private userService: UserService) { }
  GetListContrat(): Promise<any>
          { 
            const inputRecord = new MIRecord();
            return new Promise((resolve, reject) => {
            this.userService.getUserContext().subscribe((context) => 
              {
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
                          })}
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
          GetListServices(CodeVehicule : string): Promise<any>
          { 
            
            return new Promise((resolve, reject) => {
            this.userService.getUserContext().subscribe((context) => 
              {
                const inputRecord = new MIRecord();
                const request: IMIRequest = 
                  {
                    program: 'MOS300MI',
                    transaction: 'LstByProduct',
                    record: inputRecord,
                    outputFields: ["SUFI", "TX40"]
                  };
              
            inputRecord.setString("PRNO", CodeVehicule);
            request.record = inputRecord;
                    this.miService.execute(request).subscribe((response: IMIResponse) => {
                      if (!response.hasError()) 
                      {
                     
                        response.items.forEach(element => {
                          
                          this.Services.push({
                             'SUFI' : element['SUFI'],
                             'TX40' : element['TX40'],
                          })
                       });
                        resolve(this.Services)
                      
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
          GetListTypeCommandes(): Promise<any>
          { 
            
            return new Promise((resolve, reject) => {
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
              
                    this.miService.execute(request).subscribe((response: IMIResponse) => {
                      if (!response.hasError()) 
                      {
                     
                        response.items.forEach(element => {
                          
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
            console.log('-------------AAGN:'+AAGN)
            return new Promise((resolve, reject) => {
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
            inputRecord.setString("FACI", 'TUN');
            inputRecord.setString("STRT", '002');
            inputRecord.setString("CUNO", CUNO);
            inputRecord.setString("PRNO", PRNO);
            inputRecord.setString("BANO", CHASII);
            inputRecord.setString("AAGN", AAGN);
            inputRecord.setString("AOTY", AOTY);
            inputRecord.setString("SUFI", SUFI);
            inputRecord.setString("AURQ", '1');
            request.record = inputRecord;
                    this.miService.execute(request).subscribe((response: IMIResponse) => {
                      if (!response.hasError()) 
                      {
  
                      
                        console.log('--------------Cretae MCO')
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
          CreateLigneService(PONR,ORNO,service): Promise<any> {
            return new Promise((resolve, reject) => {
              this.MCOs.push({
                'PONR' : PONR,
                'ORNO': ORNO ,
                'Service':service,
                   })
                   resolve( this.MCOs);
                   
            
          
          })
        }
        CreateMCOLine(CustomerONumber:string,IdService:string,CodeVehicule:string,BANO:string): Promise<any>
        { 
          
          return new Promise((resolve, reject) => {
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
            
          inputRecord.setString("ORNO", CustomerONumber); 
          inputRecord.setString("PRNO", CodeVehicule);
          inputRecord.setString("BANO", BANO);
          inputRecord.setString("SUFI", IdService);
          inputRecord.setString("STRT", '002');
          inputRecord.setString("FACI", 'TUN');
          inputRecord.setString("AURQ", '1');
          
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
          console.log('FORINO:'+FORINO)
          console.log('TORINO:'+TORINO)
          return new Promise((resolve, reject) => {
          this.userService.getUserContext().subscribe((context) => 
            {
              const inputRecord = new MIRecord();
              const request: IMIRequest = 
                {
                  program: 'COS180MI',
                  transaction: 'InvoiceProp',
                  record: inputRecord,
                 
                };
            
          inputRecord.setString("FORNO", FORINO); 
          inputRecord.setString("TORNO", TORINO);
          inputRecord.setString("IDAT", "2021/05/28"); //invoice date
          inputRecord.setString("ACDT", '2021/05/28'); //accounting date
          inputRecord.setString("PICD", '2');
          inputRecord.setString("PAIC", '1');
          inputRecord.setString("FOPRI", '0');
          inputRecord.setString("TOPRI", '0');
         
          
          
         
          
          request.record = inputRecord;
                  this.miService.execute(request).subscribe((response: IMIResponse) => {
                    if (!response.hasError()) 
                    {

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
