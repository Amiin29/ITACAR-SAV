import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColorService } from 'src/app/color.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpParams, HttpParamsOptions } from '@angular/common/http';

@Component({
  selector: 'app-add-rdv',
  templateUrl: './add-rdv.component.html',
  styleUrls: ['./add-rdv.component.css']
})
export class AddRdvComponent implements OnInit 
{
  clickEventsubscription:Subscription;
  nom : any;
  typeRDV:any;
  date:any;
  tel:any
  heure:any;
  Description: any;
  constructor(private http: HttpClient,private mycolor:ColorService) 
    {
      this.clickEventsubscription=this.mycolor.getAddrdv().subscribe(()=>
      {
        this.AddRdv()
      })
    }
   ngOnInit(): void {}
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
      })
  }
  

}
