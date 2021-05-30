import { Component, OnInit,Input} from '@angular/core';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService} from '@infor-up/m3-odin-angular';
import { ParhouseService } from '../Service/parhouse.service';

@Component({
  selector: 'app-details-parehouse',
  templateUrl: './details-parehouse.component.html',
  styleUrls: ['./details-parehouse.component.css']
})
export class DetailsParehouseComponent implements OnInit {
  ITNO=null;
  BUYE=null;
  FACY=null;
  SUNO=null;
  WHSL=null;
  ORTY=null;
  WHSY=null;
  WHTY=null;
  WHNM=null;
  WHLO:any
  RESP=null;
  isBusy = false;
  isDetailBusy = false;
  detailItem: any;
  constructor(private miService: MIService, private ParhouseService:ParhouseService) { }
  ngOnInit(): void {
   
   
   this.GetDetailspiecesRechanges();
   
  
   


  }

  
private GetDetailspiecesRechanges()
{ 
   
   this.setBusy(true, true);
   const requestInfoByCustomer: IMIRequest = 
      {
         program: 'MMS200MI',
      transaction: 'GetItmWhsBasic',
         outputFields: ['ITNO', 'WHNM', 'RESP', 'BUYE', 'ORTY','FACY','SUNO','WHSL' ,'WHTY']
      }; 
      const inputrecord : MIRecord = new MIRecord()
      inputrecord.setString('ITNO',this.ParhouseService.GetIDParehouse());
         inputrecord.setString('WHLO',this.ParhouseService.GetCodeWHS()); 
      requestInfoByCustomer.record = inputrecord;
   this.miService.execute(requestInfoByCustomer).subscribe((responseInfoByCustomer: IMIResponse) => 
   {
      this.setBusy(false, true);
         if (!responseInfoByCustomer.hasError()) 
         {
          
            this.ITNO = responseInfoByCustomer.item['ITNO'];
            this.WHNM = responseInfoByCustomer.item['WHNM'];
            this.RESP = responseInfoByCustomer.item['RESP'];
            this.BUYE = responseInfoByCustomer.item['BUYE'];
            this.ORTY = responseInfoByCustomer.item['ORTY'];
            this.FACY= responseInfoByCustomer.item['FACY'];
            this.SUNO= responseInfoByCustomer.item['SUNO'];
            this.WHSL = responseInfoByCustomer.item['WHSL'];
            this.WHTY=responseInfoByCustomer.item['WHTY'];
                       } 
            else 
            {
                            }
   }, (error) => 
   {
      this.setBusy(false, true);
          });
}
private setBusy(isBusy: boolean, isDetail?: boolean) 
   {
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   } 
}





