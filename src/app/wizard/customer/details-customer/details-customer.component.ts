import { Component, OnInit,Input} from '@angular/core';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService} from '@infor-up/m3-odin-angular';
@Component({
  selector: 'app-details-customer',
  templateUrl: './details-customer.component.html',
  styleUrls: ['./details-customer.component.css']
})
export class DetailsCustomerComponent implements OnInit 
{
  @Input() 
  CUNO: any;
  OKCUCL:any
  OKPYCDa:any
  OKAICD:any
  OKPLTB:any
  OKIVGP:any
  OKTEPY:any
  OKLHCD:any
  OKCUCD:any
  OKSMCD:any
  OKPYCD:any
  isBusy = false;
  isDetailBusy = false;
  detailItem: any;

  constructor(private miService: MIService) { }
  ngOnInit(): void {
    this.GetDetailsByCustomer()
  }
   GetDetailsByCustomer()
   {
      this.setBusy(true, true);
         const request: IMIRequest = 
            {
               program: 'CMS100MI',
               transaction: 'LstCustByCUNO',
               outputFields: ['OKCUCD', 'OKSMCD', 'OKLHCD', 'OKPYCD', 'OKOKDIGC', 'OKAICD', 'OKCUCL', 'OKPLTB','OKIVGP','OKTEPY'] // output 
            };
         const CUNO = this.CUNO;
         const inputRecord : MIRecord = new MIRecord();
         inputRecord.setString('OKCUNO',CUNO); // parametre d'entrée
         request.record = inputRecord;
         this.miService.execute(request).subscribe((response: IMIResponse) => //exécution de requette
         {
            this.setBusy(false, true); // loading 
            if (!response.hasError()) 
            {
               this.detailItem = response.item;
               this.OKCUCL=this.detailItem['OKCUCL']
               this.OKPLTB=this.detailItem['OKPLTB']
               this.OKIVGP=this.detailItem['OKIVGP']
               this.OKTEPY=this.detailItem['OKTEPY']
               this.OKCUCD=this.detailItem['OKCUCD']
               this.OKSMCD=this.detailItem['OKSMCD']
               this.OKLHCD=this.detailItem['OKLHCD']
               this.OKPYCD=this.detailItem['OKLHCD']
               this.OKAICD=this.detailItem['OKLHCD']
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
