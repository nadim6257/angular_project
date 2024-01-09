import { TestBed } from '@angular/core/testing';

import { ExportVesselListWithStatusServiceService } from './export-vessel-list-with-status-service.service';

describe('ExportVesselListWithStatusServiceService', () => {
  let service: ExportVesselListWithStatusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportVesselListWithStatusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
