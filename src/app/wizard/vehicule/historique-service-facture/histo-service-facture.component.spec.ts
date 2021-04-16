import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoSERVICEFactureComponent } from './histo-service-facture.component';

describe('HistoSERVICEFactureComponent', () => {
  let component: HistoSERVICEFactureComponent;
  let fixture: ComponentFixture<HistoSERVICEFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoSERVICEFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoSERVICEFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
