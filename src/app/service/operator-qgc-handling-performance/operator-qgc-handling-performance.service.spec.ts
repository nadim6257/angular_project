import { TestBed } from '@angular/core/testing';

import { OperatorQgcHandlingPerformanceService } from './operator-qgc-handling-performance.service';

describe('OperatorQgcHandlingPerformanceService', () => {
  let service: OperatorQgcHandlingPerformanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorQgcHandlingPerformanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
