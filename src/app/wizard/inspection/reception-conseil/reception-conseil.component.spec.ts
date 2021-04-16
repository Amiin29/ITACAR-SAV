import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionConseilComponent } from './reception-conseil.component';

describe('ReceptionConseilComponent', () => {
  let component: ReceptionConseilComponent;
  let fixture: ComponentFixture<ReceptionConseilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionConseilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionConseilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
