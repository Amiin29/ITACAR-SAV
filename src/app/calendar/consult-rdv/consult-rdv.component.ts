import { Component, OnInit,Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColorService } from 'src/app/color.service';
import { HttpClient,HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-consult-rdv',
  templateUrl: './consult-rdv.component.html',
  styleUrls: ['./consult-rdv.component.css']
})
export class ConsultRdvComponent implements OnInit {
  @Input() item: string;
  clickEventsubscription:Subscription;
  id:any
  todayISOString : string = new Date().toISOString();

  nom:any
  type:any;
  date:any;
  tel:any
  heure:any;
  month:any
  description: any;
  constructor(private mycolor:ColorService,private http: HttpClient) {
    this.clickEventsubscription=this.mycolor.getAddrdv().subscribe(()=>{
   })
 
   }

    ngOnInit(): void 
    {
      this.id=this.mycolor.getID()
      this.GetRdvByID(this.id)
      this.GetAllInspections()
    }
  GetAllInspections(): Promise<any>
    {
      return new Promise((resolve, reject) => 
      {
        this.http.get('http://172.16.0.43:8081/inspection/all').toPromise().then(
          res => { // Success
            resolve(res);
          },msg => { // Error
            reject(msg);
            }
        );
      
      })
  }
   GetRdvByID(val): Promise<any>{
    

    console.log(this.todayISOString.substring(5,7)+'/'+this.todayISOString.substring(8,10)+'/'+this.todayISOString.substring(0,4))
    console.log(this.todayISOString.substring(11,13)+':'+this.todayISOString.substring(14,16))
    console.log('date='+this.date)
    console.log('Heure='+this.heure)
    console.log(this.todayISOString)
    console.log(this.todayISOString.substring(5,7)+' '+this.todayISOString.substring(8,10)+','+this.todayISOString.substring(0,4)+' ')
              console.log(this.todayISOString.substring(11,13)+':'+this.todayISOString.substring(14,16))

              var date1 = new Date(this.todayISOString.substring(5,7)+' '+this.todayISOString.substring(8,10)+','+this.todayISOString.substring(0,4)+' '+this.todayISOString.substring(11,13)+':'+this.todayISOString.substring(14,16));
              var date2 = new Date('05 31, 2021 16:04');
              
              //best to use .getTime() to compare dates
              if(date1.getTime() === date2.getTime()){
                console.log('date1.getTime() === date2')
              }
              
              else if(date1.getTime() > date2.getTime()){
                console.log('date1.getTime() > date2')
              }
              else {
                console.log('date1.getTime() < date2')

              }
    


    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('id', val);
      this.id=val
      this.http.get('http://172.16.0.43:8081/rdv/'+this.id,).toPromise().then(
        res => { 
          this.nom=res['name']
          this.tel=res['numTel']
          this.type=res['type']
          this.date=res['date']
          this.description=res['description']
          this.heure=res['time']
          resolve(res);
        },msg => { // Error
          reject(msg);
          }
      );
    
   })}
}
