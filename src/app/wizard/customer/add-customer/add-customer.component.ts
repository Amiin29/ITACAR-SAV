import {Component,OnInit} from '@angular/core';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService} from '@infor-up/m3-odin-angular';
import { SohoModalDialogService} from 'ids-enterprise-ng';
import { from } from 'rxjs';
import { Subscription } from 'rxjs';
import { FormControl,FormGroup, Validators } from '@angular/forms';

import { ColorService } from 'src/app/color.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

   
   verifform : FormGroup = new FormGroup({
      'codePostale' : new FormControl ([Validators.required , Validators.minLength(5)]),
      //'password' : new FormControl(Validators.required),
     // 'confirm_password' : new FormControl(Validators.required),
  
    
    });
   clickEventsubscription:Subscription;

  isDetailBusy = false;
  isBusy = false;
  detailItem: any;
  villee: any[] = [];
  display=false;
  color
  public closeResult = '(N/A)';
  title=''
  Custmername: string;
  Adresse1: string;
  Adresse2 :string
  Ville: string;
  pays: string;
  codePostale: string;
  MobileNumber: string;
  num2: string;
  FaxNumber: string;
  Email: string;
  Compagnie: string;
  ValueOfTemplateSelected : any ;
   ValueOfTownSelected : any ;
   ValueOfAreaSelected : any ;
   items: any[] = [];
   Area: any[] = [];
   fadeout : string

  constructor(private modalService: SohoModalDialogService,private mycolor:ColorService,private miService: MIService) {
     this.clickEventsubscription=this.mycolor.getAddCustomer().subscribe(()=>{
        this.AddCustomer()
     })
   }
  ngOnInit(): void {
    this.Getcustomertemplate();
    this.GetcustomerVille()
    this.color=this.mycolor.getcolor()
  }
  private setBusy(isBusy: boolean, isDetail?: boolean) 
  {
     isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
  }
  AddCustomer(){
   console.log('1***ValueOfTemplateSelected*****'+this.ValueOfTemplateSelected)
   console.log('2 ***ValueOfTownSelected*****'+this.ValueOfTownSelected)
   console.log('3****ValueOfAreaSelected***'+this.ValueOfAreaSelected)
   console.log('3****codePostale***'+this.codePostale)
         const inputRecord = new MIRecord();
         const request: IMIRequest = 
         {
            program: 'CRS610MI',
            transaction: 'Add',
            record : inputRecord,
         };
         inputRecord.setString("CUTM", this.ValueOfTemplateSelected);
         inputRecord.setString("CUNM", this.Custmername);
         inputRecord.setString("CUA1", this.Adresse1);
         inputRecord.setString("CUA2", this.Adresse2);
         inputRecord.setString("CSCD", this.ValueOfTownSelected);
         inputRecord.setString("PONO", this.codePostale);
         inputRecord.setString("ECAR", this.ValueOfAreaSelected);
         inputRecord.setString("PHNO", this.MobileNumber);
         inputRecord.setString("TFNO", this.FaxNumber);
         inputRecord.setString("MAIL", this.Email);
         request.record = inputRecord;
         this.setBusy(true, true);
         request.record = inputRecord;
         this.miService.execute(request).subscribe((response: IMIResponse) => 
         {
            this.setBusy(false, true);
            if (!response.hasError()) 
            {
               this.detailItem = response.item;
               console.log('***********CUNO**************'+this.detailItem['CUNO'])

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
//-------------------------------------------------------------------------------------
onChangeCountry(event): void { 
  const newVal = event.target.value;
  this.getCountry(newVal)
}
onChangeState(event): void { 
  const newVal = event.target.value;
  this.ValueOfAreaSelected = newVal;
}
//-------------------------------chargement de Ville-------------------------------------------------------
  getCountry(ville :string){
     const inputRecord = new MIRecord();
     inputRecord.setString('CSCD', ville);
     const request: IMIRequest = {
     program: "CRS046MI",
     transaction: "LstAreaCodes",
     outputFields: ["ECAR", "TX15", "TX40"]
        };
        request.record = inputRecord;
        this.setBusy(true);
        this.miService.execute(request).subscribe((response: IMIResponse) => {
           this.setBusy(false);
           if (!response.hasError()) {
              this.Area = response.items;
           console.log('ECAR:'+ this.Area[0]['ECAR']);
           this.ValueOfAreaSelected = this.Area[0]['ECAR'];
           }
           else {
           }
        }, (response) => {
           this.setBusy(false);
        });  
}
//-------------------------------chargement de TEMPLATE----------------------------------------------------
private Getcustomertemplate (){
  const inputRecord = new MIRecord();
  inputRecord.setString("CONO", "860");
  const request: IMIRequest = {

     program: "CRS610MI",
     transaction: "LstTemplates", 
     outputFields: ["CONO", "CUNO", "CUNM"]

  };
  this.setBusy(true);
  this.miService.execute(request).subscribe((response: IMIResponse) => {
  this.setBusy(false);
     if (!response.hasError()) {
        this.items = response.items;
        const name = this.items[1]["CUNM"];
             }
     else {
     }
  }, (response) => {
     this.setBusy(false);
  });  
  
}
//-------------------------------chargement de Pays--------------------------------------------------------------------
GetcustomerVille(){
  const inputRecord = new MIRecord();
  inputRecord.setString("CONO", "860");
  const request: IMIRequest = {

     program: "CRS045MI",
     transaction: "LstCountry",  
     outputFields: ["CONO", "CSCD", "TX40"]

  };
  this.setBusy(true);
  this.miService.execute(request).subscribe((response: IMIResponse) => {
     this.setBusy(false);
     if (!response.hasError()) {
        this.villee = response.items;
        const name = this.villee["CSCD"];
     }
     else {
     }
  }, (response) => {
     this.setBusy(false);
  }); 
} 
}
