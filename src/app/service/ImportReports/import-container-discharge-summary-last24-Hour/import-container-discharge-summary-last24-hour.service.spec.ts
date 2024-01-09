import { TestBed } from '@angular/core/testing';

import { ImportContainerDischargeSummaryLast24HourService } from './import-container-discharge-summary-last24-hour.service';

describe('ImportContainerDischargeSummaryLast24HourService', () => {
  let service: ImportContainerDischargeSummaryLast24HourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportContainerDischargeSummaryLast24HourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
