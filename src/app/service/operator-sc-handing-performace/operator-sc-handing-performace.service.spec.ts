import { TestBed } from '@angular/core/testing';

import { OperatorScHandingPerformaceService } from './operator-sc-handing-performace.service';

describe('OperatorScHandingPerformaceService', () => {
  let service: OperatorScHandingPerformaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorScHandingPerformaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
