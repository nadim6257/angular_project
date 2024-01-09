import { TestBed } from '@angular/core/testing';

import { RemovalListOfOverFlowYardService } from './removal-list-of-over-flow-yard.service';

describe('RemovalListOfOverFlowYardService', () => {
  let service: RemovalListOfOverFlowYardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemovalListOfOverFlowYardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
