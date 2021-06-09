import { Component, OnInit,Input, Injectable} from '@angular/core';
import { IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoMessageService } from 'ids-enterprise-ng';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehiculeServiceService } from 'src/app/wizard/vehicule/VehiculeService/vehicule-service.service';
import { ColorService } from 'src/app/color.service';
import { Subscription } from 'rxjs';
import { SohoToastService } from 'ids-enterprise-ng';
@Component({
  selector: 'app-add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.css'],
})
export class AddVehiculeComponent implements OnInit {
   clickEventsubscription:Subscription;
   Models: any[] = [];
   ValueOfModelSelected : any;
   Vinnumber:any;
   Numserie:any; 
   CustmerNumber:any; 
   isDetailBusy = false;
   isBusy = false;
   isModels =false;
   CUNO=null
   myForm: FormGroup;
   chassis: FormControl;
   matricule: FormControl;
   detailItem:any
 constructor(private mycolor:ColorService,private VSService : VehiculeServiceService,private miService: MIService,private messageService: SohoMessageService,private toastService: SohoToastService ) 
   {
      this.clickEventsubscription=this.mycolor.getAddVehicule().subscribe(()=>{
         this.AddVehicule()
      })
   }
      ngOnDestroy(): void {
         this.clickEventsubscription.unsubscribe()  
      }
      ngOnInit(): void 
      {
         (document.getElementById("sendbutton") as HTMLButtonElement).disabled=true
            this.GetModelsVehicul();
            this.CUNO=this.VSService.GetCustomerNumber();
            this.chassis = new FormControl('', [Validators.pattern('[A-Z0-9]*'), Validators.minLength(17), Validators.maxLength(17),Validators.required]);
            this.matricule = new FormControl('', [Validators.pattern('[0-9][0-9][0-9]TU[0-9][0-9][0-9][0-9]'), Validators.minLength(9), Validators.maxLength(9),Validators.required]);
            this.myForm = new FormGroup
               ({
                  'chassis': new FormControl('', [Validators.pattern('[A-Z0-9]*'), Validators.minLength(17), Validators.maxLength(17),Validators.required]),
                  'matricule':new FormControl('', [Validators.pattern('[0-9][0-9][0-9]TU[0-9][0-9][0-9][0-9]'), Validators.minLength(9), Validators.maxLength(9),Validators.required]),
               });
      }
   GetModelsVehicul() 
   {
      const inputRecord = new MIRecord();
      inputRecord.setString('F_INDI', '2');
      inputRecord.setString('T_INDI', '2');
      const request: IMIRequest = 
         {
            program: "CMS100MI",
            transaction: "LstModels", 
            outputFields: ['MMITNO',"MMITDS"]
         };
      request.record = inputRecord;
      this.miService.execute(request).subscribe((response: IMIResponse) => {
         if (!response.hasError()) {
            this.Models = response.items;      
            this.isModels=true;     
         }
         else {
         }
      }, (response) => {
     
      }); 
   }
   private setBusy(isBusy: boolean, isDetail?: boolean) 
      {
         isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
      }
  public AddVehicule()
   {
      const inputRecord = new MIRecord();
      const request: IMIRequest = 
         {
            program: 'MMS240MI',
            transaction: 'Add',
            record : inputRecord,
         };
      inputRecord.setString('CUNO', this.VSService.GetCustomerNumber());
      inputRecord.setString('ITNO', this.ValueOfModelSelected);
      inputRecord.setString('SERN', this.Vinnumber);     
      inputRecord.setString('RFIA', this.Numserie);
      inputRecord.setString('FACI', 'BB1');
      request.record = inputRecord;
      request.record = inputRecord;
      this.setBusy(true, true);
     this.miService.execute(request).subscribe((response: IMIResponse) => 
     {
      this.setBusy(false, true);
        if (!response.hasError()) 
         {
            this.detailItem = response.item;
         } 
        else 
         {
            this.detailItem=null
            this.ErrorAddVehciule()
         }
     }, (error) => 
     {
      this.setBusy(false, true);
      this.detailItem = undefined;
     });

 } 
   handleinput()
      { 
         if(this.myForm.valid){
         ( document.getElementById("sendbutton") as HTMLButtonElement).disabled=false
         }
         else
            {
               (document.getElementById("sendbutton") as HTMLButtonElement).disabled=true 
            }
         }
         ErrorAddVehciule(position: SohoToastPosition = SohoToastService.TOP_RIGHT) {
            this.toastService.show({ draggable: true, title: 'Ajout', message: 'Problème d ajout Véhicule' });
         }
}

