import { TestBed } from '@angular/core/testing';

import { ExportLoadedContainerListLoadAndEmptyService } from './export-loaded-container-list-load-and-empty.service';

describe('ExportLoadedContainerListLoadAndEmptyService', () => {
  let service: ExportLoadedContainerListLoadAndEmptyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportLoadedContainerListLoadAndEmptyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
