import { Component, OnInit,Input } from '@angular/core';
import { MIRecord } from '@infor-up/m3-odin';

@Component({
  selector: 'vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit {
  @Input() CUNO: String; // decorate the property with @Input()
  constructor() { }

  ngOnInit(): void {
  }
  customerSelectedEventVehicule(event: boolean){
    
    console.log('wizar - outputSElected '+event['OKCUNO'])
  }
}
