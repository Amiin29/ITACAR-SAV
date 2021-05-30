import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultRdvComponent } from './consult-rdv.component';

describe('ConsultRdvComponent', () => {
  let component: ConsultRdvComponent;
  let fixture: ComponentFixture<ConsultRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
