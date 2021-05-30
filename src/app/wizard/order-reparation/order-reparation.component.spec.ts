import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReparationComponent } from './order-reparation.component';

describe('OrderReparationComponent', () => {
  let component: OrderReparationComponent;
  let fixture: ComponentFixture<OrderReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
