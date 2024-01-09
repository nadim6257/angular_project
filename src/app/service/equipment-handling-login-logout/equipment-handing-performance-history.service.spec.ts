import { TestBed } from '@angular/core/testing';

import { EquipmentHandingPerformanceHistoryService } from './equipment-handing-performance-history.service';

describe('EquipmentHandingPerformanceHistoryService', () => {
  let service: EquipmentHandingPerformanceHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentHandingPerformanceHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
