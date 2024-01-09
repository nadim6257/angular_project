import { TestBed } from '@angular/core/testing';

import { ContainerDischargeListAppService } from './container-discharge-list-app.service';

describe('ContainerDischargeListAppService', () => {
  let service: ContainerDischargeListAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerDischargeListAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
