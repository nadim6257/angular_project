import { TestBed } from '@angular/core/testing';

import { ImportContainerDischargeExcelDetailLast24HourService } from './import-container-discharge-excel-detail-last24-hour.service';

describe('ImportContainerDischargeExcelDetailLast24HourService', () => {
  let service: ImportContainerDischargeExcelDetailLast24HourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportContainerDischargeExcelDetailLast24HourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
