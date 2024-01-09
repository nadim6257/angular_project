import { TestBed } from '@angular/core/testing';

import { ExportDestinationWiseMloLoadedContainerServiceService } from './export-destination-wise-mlo-loaded-container-service.service';

describe('ExportDestinationWiseMloLoadedContainerServiceService', () => {
  let service: ExportDestinationWiseMloLoadedContainerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportDestinationWiseMloLoadedContainerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
