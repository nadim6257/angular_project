import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContainerDischargeAndBalanceFormComponent } from './import-container-discharge-and-balance-form.component';

describe('ImportContainerDischargeAndBalanceFormComponent', () => {
  let component: ImportContainerDischargeAndBalanceFormComponent;
  let fixture: ComponentFixture<ImportContainerDischargeAndBalanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContainerDischargeAndBalanceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContainerDischargeAndBalanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
