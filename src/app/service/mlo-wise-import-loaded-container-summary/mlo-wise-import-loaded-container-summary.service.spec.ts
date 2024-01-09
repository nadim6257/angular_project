import { TestBed } from '@angular/core/testing';

import { MloWiseImportLoadedContainerSummaryService } from './mlo-wise-import-loaded-container-summary.service';

describe('MloWiseImportLoadedContainerSummaryService', () => {
  let service: MloWiseImportLoadedContainerSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MloWiseImportLoadedContainerSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
