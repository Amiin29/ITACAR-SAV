import { Component, OnInit,Input, Injectable} from '@angular/core';
import { IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoMessageService } from 'ids-enterprise-ng';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehiculeServiceService } from 'src/app/wizard/vehicule/VehiculeService/vehicule-service.service';

import { Subscription } from 'rxjs';
import { SohoToastService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.css']
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
  
  CUNO=null
  myForm: FormGroup;
  chassis: FormControl;
  matricule: FormControl;
 
 constructor(private VSService : VehiculeServiceService,private miService: MIService,private messageService: SohoMessageService,private toastService: SohoToastService ) {
   this.clickEventsubscription=this.VSService.getAddVehicule().subscribe(()=>{
      this.AddVehicule()
   })
  }
   ngOnInit(): void {
      ( document.getElementById("sendbutton") as HTMLButtonElement).disabled=true
     this.GetModelsVehicul();
    this.CUNO=this.VSService.GetCustomerNumber();
     this.chassis = new FormControl('', [Validators.pattern('[A-Z0-9]*'), Validators.minLength(17), Validators.maxLength(17),Validators.required]);
     this.matricule = new FormControl('', [Validators.pattern('[0-9][0-9][0-9]TU[0-9][0-9][0-9][0-9]'), Validators.minLength(9), Validators.maxLength(9),Validators.required]);
     this.myForm = new FormGroup({
      'chassis': new FormControl('', [Validators.pattern('[A-Z0-9]*'), Validators.minLength(17), Validators.maxLength(17),Validators.required]),
      'matricule':new FormControl('', [Validators.pattern('[0-9][0-9][0-9]TU[0-9][0-9][0-9][0-9]'), Validators.minLength(9), Validators.maxLength(9),Validators.required]),
     });
    }
   GetModelsVehicul() {
      const inputRecord = new MIRecord();
      inputRecord.setString('F_INDI', '2');
      inputRecord.setString('T_INDI', '2');
      const request: IMIRequest = {
   
         program: "CMS100MI",
         transaction: "LstModels", 
         outputFields: ['MMITNO']
     };
      request.record = inputRecord;
      this.miService.execute(request).subscribe((response: IMIResponse) => {
     
         if (!response.hasError()) {
            this.Models = response.items;           
         }
         else {
         }
      }, (response) => {
     
      }); 
   }
   showToast(position: SohoToastPosition = SohoToastService.TOP_RIGHT) {
      this.toastService.show({ draggable: true, title: 'Ajout', message: 'Véhicule ajouté avec succées', position });
    }
  AddVehicule(){
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
     inputRecord.setString('FACI', 'TUN');
     request.record = inputRecord;
     request.record = inputRecord;
     this.miService.execute(request).subscribe((response: IMIResponse) => 
     {
        if (!response.hasError()) 
        {
          } 
        else 
           {
            
            const buttons = [{ text: 'voiture non ajouté, Ressayer', click: (e, modal) => { modal.close(); } }];
            this.messageService.error()
            .title('An error occured')
           
            .buttons(buttons)
            .close();
           }
     }, (error) => 
     {
       
     });

 } 
 handleinput(){
    
   if(this.myForm.valid){
     ( document.getElementById("sendbutton") as HTMLButtonElement).disabled=false
   }
   else{
      (document.getElementById("sendbutton") as HTMLButtonElement).disabled=true
   
   }
    }
 
  
}

