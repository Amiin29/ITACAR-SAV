import { Component, OnInit } from '@angular/core';
import{ColorService} from 'src/app/color.service'
@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  public orders?: [];
  public Test = false;
  constructor(private mycolor:ColorService) { }

  ngOnInit(): void {
   
      this.mycolor.getMaintenanceOrders().then(value => {
        this.orders = value;
       if (this.orders!=null){
         this.Test=true;
       }
       
   
        
      });
     
  }

}
