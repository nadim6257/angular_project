import { TestBed } from '@angular/core/testing';

import { ExportRotationWiseContainerInformationServiceService } from './export-rotation-wise-container-information-service.service';

describe('ExportRotationWiseContainerInformationServiceService', () => {
  let service: ExportRotationWiseContainerInformationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportRotationWiseContainerInformationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
