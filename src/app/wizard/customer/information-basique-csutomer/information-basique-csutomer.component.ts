import { Component, OnInit,Input} from '@angular/core';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService} from '@infor-up/m3-odin-angular';
@Component({
  selector: 'app-information-basique-csutomer',
  templateUrl: './information-basique-csutomer.component.html',
  styleUrls: ['./information-basique-csutomer.component.css']
})
export class InformationBasiqueCsutomerComponent implements OnInit 
{
  @Input() CUNO: any;
  isBusy: boolean
  isDetailBusy = false;
  DCUNO:any
  DPONO:any
  DCUNM :any
  DTOWN :any
  DTFNO :any
  DCSCD :any
  DCUA1 :any
  DPHNO:any
  logWarning: any;
  logError: any;
   
   constructor(private miService: MIService) { }

   ngOnInit(): void 
      {
         this.GetBasicInfoByCustomer()
      }
   ngOnChanges(changes) 
      {
         this.GetBasicInfoByCustomer();
      } 
   private setBusy(isBusy: boolean, isDetail?: boolean) 
      {
         isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
      } 
   private GetBasicInfoByCustomer()
   {
         this.setBusy(true, true);
         const requestInfoByCustomer: IMIRequest = 
            {
               program: 'CRS610MI',
               transaction: 'GetBasicData',
               outputFields: ['CUNM', 'CUNO', 'TOWN', 'PONO', 'TFNO', 'CSCD', 'CUA1', 'PHNO']
            };
            const inputrecord : MIRecord = new MIRecord()
            inputrecord.setString('CUNO',this.CUNO)
            requestInfoByCustomer.record = inputrecord;
            this.miService.execute(requestInfoByCustomer).subscribe((responseInfoByCustomer: IMIResponse) => 
         {
            this.setBusy(false, true);
           if (!responseInfoByCustomer.hasError()) 
           {
              this.DCUNO = responseInfoByCustomer.item['CUNO'];
              this.DCUNM = responseInfoByCustomer.item['CUNM'];
              this.DTOWN = responseInfoByCustomer.item['TOWN'];
              this.DPHNO = responseInfoByCustomer.item['PHNO'];
              this.DCSCD = responseInfoByCustomer.item['CSCD'];
              this.DTFNO = responseInfoByCustomer.item['TFNO'];
              this.DCUA1 = responseInfoByCustomer.item['CUA1'];
              this.DPONO = responseInfoByCustomer.item['PONO'];
                          
            }else {}
     }, (error) => 
         {
            this.setBusy(false, true);
         });
   }
}
