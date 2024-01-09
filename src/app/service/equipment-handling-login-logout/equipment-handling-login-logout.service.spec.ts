import { TestBed } from '@angular/core/testing';

import { EquipmentHandlingLoginLogoutService } from './equipment-handling-login-logout.service';

describe('EquipmentHandlingLoginLogoutService', () => {
  let service: EquipmentHandlingLoginLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentHandlingLoginLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
