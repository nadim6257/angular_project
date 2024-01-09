import { TestBed } from '@angular/core/testing';

import { EquipmentHandlingPerformanceReportRtgService } from './equipment-handling-performance-report-rtg.service';

describe('EquipmentHandlingPerformanceReportRtgService', () => {
  let service: EquipmentHandlingPerformanceReportRtgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentHandlingPerformanceReportRtgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
