import { TestBed } from '@angular/core/testing';

import { ImportContainerDischargeAndBalanceService } from './import-container-discharge-and-balance.service';

describe('ImportContainerDischargeAndBalanceService', () => {
  let service: ImportContainerDischargeAndBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportContainerDischargeAndBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
