import { TestBed } from '@angular/core/testing';

import { EditVerifikasiService } from './edit-verifikasi.service';

describe('EditVerifikasiService', () => {
  let service: EditVerifikasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditVerifikasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
