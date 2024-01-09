import { TestBed } from '@angular/core/testing';

import { FeederDischargeSummaryListService } from './feeder-discharge-summary-list.service';

describe('FeederDischargeSummaryListService', () => {
  let service: FeederDischargeSummaryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeederDischargeSummaryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
