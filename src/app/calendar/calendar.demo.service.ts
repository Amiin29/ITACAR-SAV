import {Injectable,Input} from '@angular/core';
import {Observable,Subject} from 'rxjs';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CalendarDemoService 
{
      @Input() nom: string; // decorate the property with @Input()
      id:any
      items: any[] | undefined = [];
      rdv: any[] | undefined = [];
      isBusy = false;
      nameRDV:string
      isDetailBusy = false;
    constructor(private http: HttpClient, private miService: MIService, private userService: UserService) {
    }
    ngOnInit(): void {}
    GetAllRdv(): Promise<any>
    {
        return new Promise((resolve, reject) => 
        {
          console.log('tit tit---------')
            const headers = new HttpHeaders ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers':'*',
          });   
          this.http.get('http://172.16.0.43:8081/rdv/all',{headers}).toPromise().then
          (
            res => { // Success
              resolve(res);
            },msg => { // Error
              reject(msg);
              }
          );
        })
    }
    getMaintenanceOrders(): Promise<any>
    {
     
      this.items=[];
      this.setBusy(true);
      const inputRecord = new MIRecord();
      inputRecord.setString("STSF", "0");
      inputRecord.setString("STST", "80");
      inputRecord.setString("FACF", 'BB1');
      inputRecord.setString("FACT", 'BB1');
      inputRecord.setString("REAR", 'PREP');
      return new Promise((resolve, reject) => 
      {
          this.userService.getUserContext().subscribe((context) => {
          const request: IMIRequest = {
          program: 'MOS100MI',
          transaction: 'Select',
          record: inputRecord,
          outputFields: ["MFNO", "PRNO", "RORN", "STDT","FIDT","MSTI","MFTI","ITDS","SUFI","BANO","WHST"]
        };
        this.miService.execute(request).subscribe((response: IMIResponse) => 
        {
          if (!response.hasError()) 
          {
            console.log(response.items)
            response.items.forEach((elem) =>
                this.items.push(
                {
                  "id": elem.MFNO,
                  "subject": elem.ITDS,
                  "shortSubject": 'N° Commande de maintenance : '+elem.RORN+'   ||   '+'N° Ordre de travail : '+elem.MFNO+' | '
                 + ' Vehicule : '+elem.PRNO+' | '+'chassie : '+elem.BANO+' | '+'Service : '+elem.SUFI,
                  "TypeRdv": elem.ITDS,
                  "comments": 'Vehicule : '+elem.PRNO+' | '+'chassie : '+elem.BANO+' | '+'Service : '+elem.SUFI,
                 // //"location": "Canada Office",
                 //"status": "Approved",
                  "starts": new Date(elem.STDT.substring(0,4),elem.STDT.substring(4,6)-1,elem.STDT.substring(6,8),elem.MSTI.substring(0,2),elem.MSTI.substring(2,4)).toISOString(),
                  "ends": new Date(elem.FIDT.substring(0,4),elem.FIDT.substring(4,6)-1,elem.FIDT.substring(6,8),elem.MFTI.substring(0,2),elem.MFTI.substring(2,4)).toISOString(),
                  "type": "team",
                  "isAllDay": "true",
                  //"translationKey": "SickTime"
                })

               
            )
         
               
            resolve(this.items)
          } 
            else 
              {
                this.handleError('Échec de chargement de la liste des éléments');
              }
                this.setBusy(false);
                return ;
          }, (error) => 
            {
              reject(error)
              this.setBusy(false);
              this.handleError('Échec de chargement de la liste des éléments', error);
            });
          }, (error) => 
            {
              reject(error)
              this.setBusy(false);
              this.handleError('Échec de l obtention du utilisateur', error);
            });
      });  
    }
      private setBusy(isBusy: boolean, isDetail?: boolean) {
        isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
      }
      private handleError(message: string, error?: any) 
      {}
      public getCalendarEventTypes(): Observable<any> 
      {
        return this.http.get('./app/demodata/calendar-eventtypes.demo.json');
      }
      public getCalendarEvents(): Observable<any> 
      {
        return this.http.get('./app/demodata/calendar-events.demo.json');
      }
  }
