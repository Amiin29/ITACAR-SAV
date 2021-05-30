import { TestBed } from '@angular/core/testing';

import { OrderReparationService } from './order-reparation.service';

describe('OrderReparationService', () => {
  let service: OrderReparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderReparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
