import { TestBed } from '@angular/core/testing';

import { OffDockBlockedContainerListService } from './off-dock-blocked-container-list.service';

describe('OffDockBlockedContainerListService', () => {
  let service: OffDockBlockedContainerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffDockBlockedContainerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
