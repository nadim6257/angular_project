import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContainerDischargeSummaryLast24HourReportComponent } from './import-container-discharge-summary-last24-hour-report.component';

describe('ImportContainerDischargeSummaryLast24HourReportComponent', () => {
  let component: ImportContainerDischargeSummaryLast24HourReportComponent;
  let fixture: ComponentFixture<ImportContainerDischargeSummaryLast24HourReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContainerDischargeSummaryLast24HourReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContainerDischargeSummaryLast24HourReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
