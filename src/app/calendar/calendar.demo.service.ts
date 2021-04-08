import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import {SohoMessageService } from 'ids-enterprise-ng';

@Injectable()
export class CalendarDemoService {
  items: any[] | undefined = [];
  isBusy = false;
  isDetailBusy = false;
  constructor(private http: HttpClient, private miService: MIService, private userService: UserService, private messageService: SohoMessageService) {
    //super('CalendarDemoService')
  }
  getMaintenanceOrders(): Promise<any>{
    this.setBusy(true);
    const inputRecord = new MIRecord();
    const fromStatus = "10";
    const toStatus = "99";
    inputRecord.setString("STSF", fromStatus);
    inputRecord.setString("STST", toStatus);
    return new Promise((resolve, reject) => {
      this.userService.getUserContext().subscribe((context) => {
        const request: IMIRequest = {
          program: 'MOS100MI',
          transaction: 'Select',
          record: inputRecord,
          outputFields: ["MFNO", "PRNO", "RORN", "STDT","FIDT","MSTI","MFTI"]
        };

        this.miService.execute(request).subscribe((response: IMIResponse) => {
         
          if (!response.hasError()) {

            // @ts-ignore
            response.items.forEach((elem) => //220 / 5000
            
              // @ts-ignore
              this.items.push({
                "id": elem.MFNO,
                "subject": "Discretionary Time Off",
                "shortSubject": elem.PRNO,
                "comments": "Short getaway",
                "location": "Us Office",
                "status": "Draft",
                "starts": new Date(elem.STDT.substring(0,4),elem.STDT.substring(4,6),elem.STDT.substring(6,8),elem.MSTI.substring(0,2),elem.MSTI.substring(2,4)).toISOString(),
                "ends": new Date(elem.FIDT.substring(0,4),elem.FIDT.substring(4,6),elem.FIDT.substring(6,8),elem.MFTI.substring(0,2),elem.MFTI.substring(2,4)).toISOString(),
                "type": "sick",
                "isAllDay": "true"
              })
            )

            resolve(this.items)
          } else {
            this.handleError('Failed to list items');
          }

          this.setBusy(false);
          return ;
        }, (error) => {
          reject(error)
          this.setBusy(false);
          this.handleError('Failed to list items', error);
        });
      }, (error) => {
        reject(error)
        this.setBusy(false);
        this.handleError('Failed to get user context', error);
      });
    });
    

  }

  private setBusy(isBusy: boolean, isDetail?: boolean) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
  }

  private handleError(message: string, error?: any) {
  //  this.logError(message, error ? '- Error: ' + JSON.stringify(error) : '');
    const buttons = [{
      text: 'Ok', click: (e: any, modal: { close: () => void; }) => {
        modal.close();
      }
    }];
    this.messageService.error()
      .title('An error occured')
      .message(message + '. More details might be available in the browser console.')
      .buttons(buttons)
      .open();
  }

  public getCalendarEventTypes(): Observable<any> {
    return this.http.get('./app/demodata/calendar-eventtypes.demo.json');
  }

  public getCalendarEvents(): Observable<any> {
    return this.http.get('./app/demodata/calendar-events.demo.json');
  }
  
}
