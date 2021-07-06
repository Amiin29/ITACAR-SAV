import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColorService } from 'src/app/color.service';
import { HttpClient,HttpHeaders,HttpParams, HttpParamsOptions } from '@angular/common/http';

@Component({
  selector: 'app-update-rdv',
  templateUrl: './update-rdv.component.html',
  styleUrls: ['./update-rdv.component.css']
})

export class UpdateRDVComponent implements OnInit 
{
  updateNom:any
  id:any
  nom:any
  type:any;
  date:any;
  tel:any
  heure:any;
  desc:any
  description: any;
  getType:any
  getNom:any
  getDate:any
  getheure:any
  getTel:any
  getDescription:any
  clickEventsubscription:Subscription;
        rdv={
          name:'',
          numTel:'',
          date:'',
          time:'',
          type:'',
          description:'',
        }
  constructor(private mycolor:ColorService,private http: HttpClient) 
  { 
    this.clickEventsubscription=this.mycolor.getUpdateRdv().subscribe(()=>{
      this.UpdateRDV()
   })
  }

  ngOnInit(): void 
  {
    this.id=this.mycolor.getID()
    this.GetRdvByID(this.id)
  }

  GetRdvByID(val): Promise<any>
  {


    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('id', val);
      this.id=val
      this.http.get('http://172.16.0.43:8081/rdv/'+this.id).toPromise().then(
        res => { 
          this.nom=res['name']
          this.tel=res['numTel']
          this.type=res['type']
          this.date=res['date']
          this.description=res['description']
          this.heure=res['time']
          resolve(res);
        },msg => 
          { // Error
            reject(msg);
          }
      );    
   })
  }
  UpdateRDV()
  {
    return new Promise((resolve, reject) => 
    {
      const headers = new HttpHeaders ({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT',
        'Access-Control-Allow-Headers':'*',
    });
       this.rdv={
          name:this.nom,
          numTel:this.tel,
          date:this.date,
          time:this.heure,
          type:this.type,
          description:this.description,
        }
      const response=this.http.put('http://172.16.0.43:8081/rdv/'+this.id,this.rdv,{headers:headers}).toPromise().then(
        res => { 
          resolve(res);
          window.location.reload();
        },msg => { // Error
          reject(msg);
          }
      );
    
   })
  }
  
}
