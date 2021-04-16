import { Component, OnInit,Input} from '@angular/core';
import { IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoMessageService } from 'ids-enterprise-ng';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { ColorService } from 'src/app/color.service';

@Component({
  selector: 'app-add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.css']
})
export class AddVehiculeComponent implements OnInit {
  Models: any[] = [];
  Model : any;
  ValueOfModelSelected : any;
  Vinnumber:any;
  Numserie:any; 
  CustmerNumber:any; 
  isDetailBusy = false;
  isBusy = false;
  color
  myForm: FormGroup;
  chassis: FormControl;
  matricule: FormControl;
 @Input() CUNO :any;
 constructor(private miService: MIService,private messageService: SohoMessageService,private mycolor:ColorService ) { }
   ngOnInit(): void {
     this.GetModelsVehicul();
     this.CUNO=this.mycolor.getid();
     this.chassis = new FormControl('', [Validators.pattern('[a-zA-Z]*[0-9]'), Validators.minLength(11), Validators.maxLength(11)]);
     this.matricule = new FormControl('', [Validators.pattern('[t-uT-U]*[0-9]'), Validators.minLength(8), Validators.maxLength(9)]);
     this.myForm = new FormGroup({
      'chassis': this.chassis,
      'matricule':this.matricule,
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
         //  this.Model = this.Models[1]["CUNM"];
           
            console.log("this.Model " + this.Models[0]['MMITNO']);
         }
         else {
            this.handleError(response.error);
           // console.log('------' + this.setBusy);
         }
      }, (response) => {
     
         this.handleError(response, 'customer');
      }); 
   }
  AddVehicule(){
     console.log('Model Selected : '+this.ValueOfModelSelected)
     const inputRecord = new MIRecord();
     const request: IMIRequest = 
     {
        program: 'MMS240MI',
        transaction: 'Add',
        record : inputRecord,
     };
    
     inputRecord.setString('CUNO', this.CUNO);
     inputRecord.setString('ITNO', this.ValueOfModelSelected);
     inputRecord.setString('SERN', this.Vinnumber);
    // inputRecord.setString('SERN', this.Vinnumber);
     inputRecord.setString('FACI', 'TUN');
     request.record = inputRecord;
     request.record = inputRecord;
     this.miService.execute(request).subscribe((response: IMIResponse) => 
     {
        if (!response.hasError()) 
        {
         const buttons = [{ text: 'voiture ajouté avec succès', click: (e, modal) => { modal.close(); } }];
         this.messageService.error()
         .title('Valider')
        
         .buttons(buttons)
         .close();
        } 
        else 
           {
            
            const buttons = [{ text: 'voiture ajouté avec succès', click: (e, modal) => { modal.close(); } }];
            this.messageService.error()
            .title('An error occured')
           
            .buttons(buttons)
            .close();
            console.log('erreur errorCode:'+response.errorCode)
            console.log('erreur errorMessage:'+response.errorMessage)
           }
     }, (error) => 
     {
       
        this.handleError('Failed to get details', error);
        console.log('erreur:'+error)
     });

 } 
 
 private handleError(message: string, error?: any) 
 {
      
       const buttons = [{ text: 'Ok', click: (e, modal) => { modal.close(); } }];
       this.messageService.error()
       .title('An error occured')
       .message(message + '. More details might be available in the browser console.')
       .buttons(buttons)
       .open();
 }
 
  
}
