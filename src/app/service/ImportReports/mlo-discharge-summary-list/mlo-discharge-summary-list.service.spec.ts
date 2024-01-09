import { TestBed } from '@angular/core/testing';

import { MloDischargeSummaryListService } from './mlo-discharge-summary-list.service';

describe('MloDischargeSummaryListService', () => {
  let service: MloDischargeSummaryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MloDischargeSummaryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
