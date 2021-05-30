import { Component, OnInit,Input,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-details-inspection',
  templateUrl: './details-inspection.component.html',
  styleUrls: ['./details-inspection.component.css']
})
export class DetailsInspectionComponent implements OnInit {
  @Input() inspec:any
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit(): void {
  }

}
