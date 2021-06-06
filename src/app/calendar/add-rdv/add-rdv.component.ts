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
      
      const object=
      {
        name:this.nom,
        numTel:this.tel,
        type:this.typeRDV,
        description:this.Description,
        time :this.heure,
        date:this.date
      }

      var lengthdate=this.date.substring(2,4)
      if (lengthdate.length==2){
        //console.log(this.date.substring(0,1)+' '+this.date.substring(2,4)+' '+this.date.substring(5,10)+' '+this.heure)
      var datesysteme = new Date(this.todayISOString.substring(5,7)+' '+this.todayISOString.substring(8,10)+' '+this.todayISOString.substring(0,4)+' '+this.todayISOString.substring(11,13)+':'+this.todayISOString.substring(14,16));
    var dateInput=new Date(this.date.substring(0,1)+' '+this.date.substring(2,4)+' '+this.date.substring(5,10)+' '+this.date.substring(0,1)+':'+this.date.substring(2,4))
    //console.log('date Input='+dateInput)
   // console.log('date system ='+datesysteme)
      }
      else if (lengthdate.length==1){
      //console.log(this.date.substring(0,1)+' '+this.date.substring(2,4)+' '+this.date.substring(5,10)+' '+this.heure)
      var datesysteme = new Date(this.todayISOString.substring(5,7)+' '+this.todayISOString.substring(8,10)+' '+this.todayISOString.substring(0,4)+' '+this.todayISOString.substring(11,13)+':'+this.todayISOString.substring(14,16));
      var dateInput=new Date(this.date.substring(0,1)+' '+this.date.substring(2,4)+' '+this.date.substring(4,9)+' '+this.date.substring(0,1)+':'+this.date.substring(2,4))
      //console.log('date Input='+dateInput)
      //console.log('date system ='+datesysteme)
      }
 

      this.http.post('http://172.16.0.43:8081/rdv/',object,{headers:headers}).toPromise().then
      (
        
          res => 
          { // Success 
            resolve(res);
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
