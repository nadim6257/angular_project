import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentHandlingLoginLogoutComponent } from './equipment-handling-login-logout.component';

describe('EquipmentHandlingLoginLogoutComponent', () => {
  let component: EquipmentHandlingLoginLogoutComponent;
  let fixture: ComponentFixture<EquipmentHandlingLoginLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentHandlingLoginLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentHandlingLoginLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
