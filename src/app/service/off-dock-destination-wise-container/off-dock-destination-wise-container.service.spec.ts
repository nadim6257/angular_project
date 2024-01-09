import { TestBed } from '@angular/core/testing';

import { OffDockDestinationWiseContainerService } from './off-dock-destination-wise-container.service';

describe('OffDockDestinationWiseContainerService', () => {
  let service: OffDockDestinationWiseContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffDockDestinationWiseContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
