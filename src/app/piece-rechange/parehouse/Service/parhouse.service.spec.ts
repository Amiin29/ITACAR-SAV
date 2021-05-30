import { TestBed } from '@angular/core/testing';

import { ParhouseService } from './parhouse.service';

describe('ParhouseService', () => {
  let service: ParhouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParhouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
