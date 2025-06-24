import { TestBed } from '@angular/core/testing';

import { PosetaService } from './poseta.service';

describe('PosetaService', () => {
  let service: PosetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
