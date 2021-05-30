import { Component, OnInit,Input} from '@angular/core';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService} from '@infor-up/m3-odin-angular';

@Component({
  selector: 'app-details-piece-rechanges',
  templateUrl: './details-piece-rechanges.component.html',
  styleUrls: ['./details-piece-rechanges.component.css']
})
export class DetailsPieceRechangesComponent implements OnInit {
  @Input() ITNO: any;
  RENM:any
  ITDS:any
  RESP:any
  ITTY:any
  ITGR:any
  isBusy = false;
  isDetailBusy = false;
  detailItem: any;
  constructor(private miService: MIService) { }
  ngOnInit(): void {
    this.GetDetailspiecesRechanges()
  }
  ngOnChanges(changes) {
   this.GetDetailspiecesRechanges()
 }
//---------------------------------------------- details  client----------------------------------------
GetDetailspiecesRechanges()
{ console.log('++++++++++++++++++++++++++++++++++++++')
   this.setBusy(true, true);
      const request: IMIRequest = 
      {
         program: 'MMS200MI',
         transaction: 'GetItmBasic',
         outputFields: ['ITNO','ITDS', 'RESP', 'RENM','ITTY','ITGR']
      };
         //const CUNO = this.CUNO;
         const inputRecord : MIRecord = new MIRecord();
         inputRecord.setString('ITNO',this.ITNO);
         request.record = inputRecord;
         this.miService.execute(request).subscribe((response: IMIResponse) => 
         {
            this.setBusy(false, true);
            if (!response.hasError()) 
            {
               this.detailItem = response.item;
               console.log( this.detailItem)
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
