import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContainerDischargeExcelDetailLast24HourReportSummaryComponent } from './import-container-discharge-excel-detail-last24-hour-report-summary.component';

describe('ImportContainerDischargeExcelDetailLast24HourReportSummaryComponent', () => {
  let component: ImportContainerDischargeExcelDetailLast24HourReportSummaryComponent;
  let fixture: ComponentFixture<ImportContainerDischargeExcelDetailLast24HourReportSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContainerDischargeExcelDetailLast24HourReportSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContainerDischargeExcelDetailLast24HourReportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
