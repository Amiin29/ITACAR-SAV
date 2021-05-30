import { Component, OnInit,Input} from '@angular/core';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService} from '@infor-up/m3-odin-angular';

@Component({
  selector: 'app-information-financere',
  templateUrl: './information-financere.component.html',
  styleUrls: ['./information-financere.component.css']
})
export class InformationFinancereComponent implements OnInit 
{
   @Input() CUNO: any;
   BLCD : any;
   TXAP : any;
   CUCD : any;
   TEPY: any;
   isBusy: boolean
   isDetailBusy = false;
   detailFinancialoByCustomer:any;

   constructor(private miService: MIService) { }

   ngOnInit(): void 
      {
      this.GetFinancialInfoByCustomer()
      }
   ngOnChanges(changes) 
      {
      this.GetFinancialInfoByCustomer();
      } 
   GetFinancialInfoByCustomer()
   {
      this.setBusy(true, true);
      const requestfFinancial: IMIRequest = 
         {
            program: 'CRS610MI',
            transaction: 'GetFinancial',
            outputFields: ['BLCD', 'TXAP','CUCD', 'TEPY']
         };
      const CUNO = this.CUNO;
      const inputRecord : MIRecord = new MIRecord();
      inputRecord.setString('CUNO',CUNO);
      requestfFinancial.record = inputRecord;
      this.miService.execute(requestfFinancial).subscribe((responseFinancial: IMIResponse) => 
        {
           this.setBusy(false, true);
               if (!responseFinancial.hasError()) 
               {
                  this.detailFinancialoByCustomer = responseFinancial.item;
                  this.BLCD = this.detailFinancialoByCustomer['BLCD'];
                  this.CUCD = this.detailFinancialoByCustomer['CUCD'];
                  this.TEPY = this.detailFinancialoByCustomer['TEPY'];
                  this.TXAP = this.detailFinancialoByCustomer['TXAP'];
               } 
               else 
              {
                 this.detailFinancialoByCustomer = undefined;
              }
        }, (error) => 
        {
           this.setBusy(false, true);
           this.detailFinancialoByCustomer = undefined;
        });
   }
   private setBusy(isBusy: boolean, isDetail?: boolean) 
      {
         isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
      }
}
