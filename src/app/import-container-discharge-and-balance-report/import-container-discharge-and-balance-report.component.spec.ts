import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContainerDischargeAndBalanceReportComponent } from './import-container-discharge-and-balance-report.component';

describe('ImportContainerDischargeAndBalanceReportComponent', () => {
  let component: ImportContainerDischargeAndBalanceReportComponent;
  let fixture: ComponentFixture<ImportContainerDischargeAndBalanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContainerDischargeAndBalanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContainerDischargeAndBalanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
