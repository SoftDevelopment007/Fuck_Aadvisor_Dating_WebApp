import { TestBed } from '@angular/core/testing';

import { EscortService } from './escort.service';

describe('EscortService', () => {
  let service: EscortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
