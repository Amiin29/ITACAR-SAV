import { Component, OnInit,Input} from '@angular/core';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService} from '@infor-up/m3-odin-angular';

@Component({
  selector: 'app-details-customer',
  templateUrl: './details-customer.component.html',
  styleUrls: ['./details-customer.component.css']
})
export class DetailsCustomerComponent implements OnInit {
  @Input() CUNO: any;
  isBusy = false;
  isDetailBusy = false;
  detailItem: any;
  constructor(private miService: MIService) { }
  ngOnInit(): void {
    this.GetDetailsByCustomer()
  }
//---------------------------------------------- details  client----------------------------------------
GetDetailsByCustomer()
{
   this.setBusy(true, true);
      const request: IMIRequest = 
      {
         program: 'CMS100MI',
         transaction: 'LstCustByCUNO',
         outputFields: ['OKCUCD', 'OKSMCD', 'OKLHCD', 'OKPYCD', 'OKOKDIGC', 'OKAICD', 'OKCUCL', 'OKPLTB','OKIVGP','OKTEPY']
      };
         const CUNO = this.CUNO;
         const inputRecord : MIRecord = new MIRecord();
         inputRecord.setString('OKCUNO',CUNO);
         request.record = inputRecord;
         this.miService.execute(request).subscribe((response: IMIResponse) => 
         {
            this.setBusy(false, true);
            if (!response.hasError()) 
            {
               this.detailItem = response.item;
            } 
            else 
               {
                  this.detailItem = undefined;
               }
         }, (error) => 
         {
            this.setBusy(false, true);
            this.detailItem = undefined;
         });
}

private setBusy(isBusy: boolean, isDetail?: boolean) 
   {
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   }
}
