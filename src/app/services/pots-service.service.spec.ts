import { TestBed } from '@angular/core/testing';

import { PotsServiceService } from './pots-service.service';

describe('PotsServiceService', () => {
  let service: PotsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
