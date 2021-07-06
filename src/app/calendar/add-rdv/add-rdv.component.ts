import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColorService } from 'src/app/color.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {  SohoToastService } from 'ids-enterprise-ng';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { kMaxLength } from 'node:buffer';

@Component({
  selector: 'app-add-rdv',
  templateUrl: './add-rdv.component.html',
  styleUrls: ['./add-rdv.component.css']
})
export class AddRdvComponent implements OnInit 
{
  clickEventsubscription:Subscription;
  Description: any;
  nom : any;
  typeRDV:any;
  date:any;
  tel:any
  NewDate2:any
  NewDate1=''
  heure:any;
  todayISOString : string = new Date().toISOString();
  myForm: FormGroup;
  telephone:FormControl;
  Review:FormControl;
  constructor(private SohoToastService:SohoToastService, private http: HttpClient,private mycolor:ColorService) 
    {
      this.clickEventsubscription=this.mycolor.getAddrdv().subscribe(()=>
      {
        this.AddRdv()
      })
    }
    ngOnDestroy(): void {
      this.clickEventsubscription.unsubscribe()  }
   ngOnInit(): void {
    ( document.getElementById("sendbutton") as HTMLButtonElement).disabled=true
    this.telephone= new FormControl('',[Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8),Validators.required]);
    this.Review= new FormControl('',[Validators.required]);
    this.myForm = new FormGroup({
     'telephone': new FormControl('', [Validators.pattern('[0-9]*'), Validators.minLength(8),Validators.maxLength(8),Validators.required]),
     'Review' : new FormControl('', [Validators.required]),
    });
    
   }
  AddRdv(): Promise<any>
  {
    return new Promise((resolve, reject) => 
    {
          const headers = new HttpHeaders (
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers':'*',
          });
          console.log(this.date)
          let index1=this.date.indexOf("/",0)
          let month=this.date.substring(0,index1)
          let index2=this.date.indexOf("/",index1+1)
          let day=this.date.substring(index1+1,index2)
          let annne=this.date.substring(index2,this.date.length)
       if(month.length==1){
         month = '0' + month
       }
       if(day.length==1){
        day = '0' + day
      }
          let newanne = month + "/" + day  + annne
    console.log(newanne)
      const object=
      {
        name:this.nom,
        numTel:this.tel,
        type:this.typeRDV,
        description:this.Description,
        time :this.heure,
        date:newanne
      }
      this.http.post('http://172.16.0.43:8081/rdv/',object,{headers:headers}).toPromise().then
      (
          res => 
          { // Success 
            console.log(res)
            resolve(res);
            window.location.reload();
          },msg => 
            { // Error
              reject(msg);
            }
        );
        this.showToastDateValide()
  
    

      }
      )
      
  }
  showToastDateInvalide(position: SohoToastPosition = SohoToastService.TOP_RIGHT) 
  {
    this.SohoToastService.show({ draggable: true, title: '', message: 'Date Invalide', position });
  }
  showToastDateValide(position: SohoToastPosition = SohoToastService.TOP_RIGHT) 
  {
    this.SohoToastService.show({ draggable: true, title: '', message: 'RDV ajouté avec succès', position });
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
