import { TestBed } from '@angular/core/testing';

import { OperatorRtgHandlingPerformaceService } from './operator-rtg-handling-performace.service';

describe('OperatorRtgHandlingPerformaceService', () => {
  let service: OperatorRtgHandlingPerformaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorRtgHandlingPerformaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
