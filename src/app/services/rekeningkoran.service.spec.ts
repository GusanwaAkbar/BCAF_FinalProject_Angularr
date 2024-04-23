import { TestBed } from '@angular/core/testing';

import { RekeningkoranService } from './rekeningkoran.service';

describe('RekeningkoranService', () => {
  let service: RekeningkoranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekeningkoranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
