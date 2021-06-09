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
  ngOnChanges(changes) 
  {
     this.GetDetailsByCustomer();
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
               
               
               this.OKCUCD=this.detailItem['OKCUCD']
               this.OKSMCD=this.detailItem['OKSMCD']
              
               this.OKPYCD=this.detailItem['OKPYCD']
               this.OKAICD=this.detailItem['OKAICD']
              
               if (this.detailItem['OKIVGP'].length != 0){
                  this.OKIVGP=this.detailItem['OKIVGP'];
               }
               else{
                  this.OKIVGP="Non utilisé"
               }

               if (this.detailItem['OKLHCD'].length!=0){
                  this.OKLHCD=this.detailItem['OKLHCD'];
               }else{
                  this.OKLHCD="Non utilisé";
               }

               if (this.detailItem['OKTEPY'].length!=0){
                  this.OKTEPY=this.detailItem['OKTEPY']
               }else{
                  this.OKTEPY="Non utilisé";
               }
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
