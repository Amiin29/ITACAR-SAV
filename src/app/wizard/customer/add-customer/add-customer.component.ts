import {Component,OnInit} from '@angular/core';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService} from '@infor-up/m3-odin-angular';
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
    });
   clickEventsubscription:Subscription;

  isDetailBusy = false;
  isBusy = false;
  detailItem: any;
  countrys: any[] = [];
  display=false;
  public closeResult = '(N/A)';
   Custmername: string;
   Adresse1: string;
   Adresse2 :string
 
  
   codePostale: string;
   MobileNumber: string;
   num2: string;
   FaxNumber: string;
   Email: string;
   Compagnie: string;
  
   ValueOfCountrySelected : any
   ValueOfAreaSelected : any ;
   items: any[] = [];
   Area: any[] = [];
  
  constructor(private mycolor:ColorService,private miService: MIService) {
     this.clickEventsubscription=this.mycolor.getAddCustomer().subscribe(()=>{
        this.AddCustomer()
     })
   }
  ngOnInit(): void {
  
   console.log('ValueOfTownSelected:'+this.ValueOfCountrySelected)
    this.GetAllCountrys()
    
   
  }
  private setBusy(isBusy: boolean, isDetail?: boolean) 
  {
     isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
  }
  AddCustomer(){
               


         const inputRecord = new MIRecord();
         const request: IMIRequest = 
         {
            program: 'CRS610MI',
            transaction: 'Add',
            record : inputRecord,
         };
        
         inputRecord.setString("CUTM", 'C000');
         inputRecord.setString("CUNM", this.Custmername);
         inputRecord.setString("CUA1", this.Adresse1);
         inputRecord.setString("CUA2", this.Adresse2);
         inputRecord.setString("CSCD", this.ValueOfCountrySelected);
         inputRecord.setString("PONO", this.codePostale);
         inputRecord.setString("ECAR", this.ValueOfAreaSelected);
         inputRecord.setString("PHNO", this.MobileNumber);
         inputRecord.setString("TFNO", this.FaxNumber);
         inputRecord.setString("MAIL", this.Email);
         inputRecord.setString("TOWN", this.ValueOfAreaSelected);

         //inputRecord.setString("TEPY", 'I30');
         inputRecord.setString("STAT", '20');

           
            console.log('CUNM='+this.Custmername)
            console.log('CUA1='+this.Adresse1+'CUA2='+this.Adresse2)
            console.log('CSCD='+this.ValueOfCountrySelected+'PONO='+this.codePostale)
            console.log('ECAR='+this.ValueOfAreaSelected+'PHNO='+this.MobileNumber)
            console.log('TFNO='+this.FaxNumber+'MAIL='+this.Email)

         request.record = inputRecord;
         this.setBusy(true, true);
         request.record = inputRecord;
         this.miService.execute(request).subscribe((response: IMIResponse) => 
         {
            
            this.setBusy(false, true);
            if (!response.hasError()) 
            {
               this.detailItem = response.item;
               console.log (response)
          
            } 
            else 
               {
                  this.detailItem = undefined;
                 // this.handleError('Failed to get details');
               }
         }, (error) => 
         {
            this.setBusy(false, true);
            this.detailItem = undefined;
           // this.handleError('Failed to get details', error);
         });

        // this.listItems();
}


//-------------------------------chargement de Ville-------------------------------------------------------
  GetAllStates(ville :string){
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
          
              this.ValueOfAreaSelected='TU';
           }
           else {
           }
        }, (response) => {
           this.setBusy(false);
        });  
}
//-------------------------------chargement de TEMPLATE----------------------------------------------------

//-------------------------------chargement de Pays--------------------------------------------------------------------
GetAllCountrys(){
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
        this.countrys = response.items;
        this.ValueOfCountrySelected='TN';
        this.GetAllStates (  this.ValueOfCountrySelected)
     }
     else {
     }
  }, (response) => {
     this.setBusy(false);
  }); 
} 
//---------county bled fibeli w----------------anahy el state?------------------------------------------------------------
onChangeCountry(event): void { 
  this.ValueOfCountrySelected = event;
   this.GetAllStates(event)
   console.log('ValueOfTownSelected:'+this.ValueOfCountrySelected)
 }

 onChangeState(event): void { 
   this.ValueOfAreaSelected = event;
   console.log('ValueOfAreaSelected:'+this.ValueOfAreaSelected)
 }
}
