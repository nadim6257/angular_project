import { TestBed } from '@angular/core/testing';

import { ContainerEventHistoryService } from './container-event-history.service';

describe('ContainerEventHistoryService', () => {
  let service: ContainerEventHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerEventHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
