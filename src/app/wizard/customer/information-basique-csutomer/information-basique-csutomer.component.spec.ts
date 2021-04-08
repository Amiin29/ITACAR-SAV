import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationBasiqueCsutomerComponent } from './information-basique-csutomer.component';

describe('InformationBasiqueCsutomerComponent', () => {
  let component: InformationBasiqueCsutomerComponent;
  let fixture: ComponentFixture<InformationBasiqueCsutomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationBasiqueCsutomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationBasiqueCsutomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
