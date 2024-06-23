import { TestBed } from '@angular/core/testing';

import { BarbersAdministrationService } from './barbers-administration.service';

describe('BarbersAdministrationService', () => {
  let service: BarbersAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarbersAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
