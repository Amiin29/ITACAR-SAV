import { Component, OnInit ,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InspectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
