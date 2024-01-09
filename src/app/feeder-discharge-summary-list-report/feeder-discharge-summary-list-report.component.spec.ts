import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederDischargeSummaryListReportComponent } from './feeder-discharge-summary-list-report.component';

describe('FeederDischargeSummaryListReportComponent', () => {
  let component: FeederDischargeSummaryListReportComponent;
  let fixture: ComponentFixture<FeederDischargeSummaryListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeederDischargeSummaryListReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeederDischargeSummaryListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
