import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationFinancereComponent } from './information-financere.component';

describe('InformationFinancereComponent', () => {
  let component: InformationFinancereComponent;
  let fixture: ComponentFixture<InformationFinancereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationFinancereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationFinancereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
