import { TestBed } from '@angular/core/testing';

import { BillsServiceService } from './bills-service.service';

describe('BillsServiceService', () => {
  let service: BillsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
