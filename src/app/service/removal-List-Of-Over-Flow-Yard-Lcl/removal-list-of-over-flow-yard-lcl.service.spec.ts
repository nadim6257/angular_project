import { TestBed } from '@angular/core/testing';

import { RemovalListOfOverFlowYardLclService } from './removal-list-of-over-flow-yard-lcl.service';

describe('RemovalListOfOverFlowYardLclService', () => {
  let service: RemovalListOfOverFlowYardLclService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemovalListOfOverFlowYardLclService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
