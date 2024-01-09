import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContainerDischargeExcelDetailLast24HourReportDetailComponent } from './import-container-discharge-excel-detail-last24-hour-report-detail.component';

describe('ImportContainerDischargeExcelDetailLast24HourReportDetailComponent', () => {
  let component: ImportContainerDischargeExcelDetailLast24HourReportDetailComponent;
  let fixture: ComponentFixture<ImportContainerDischargeExcelDetailLast24HourReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContainerDischargeExcelDetailLast24HourReportDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContainerDischargeExcelDetailLast24HourReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
