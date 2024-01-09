import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MloDischargeSummaryListReportComponent } from './mlo-discharge-summary-list-report.component';

describe('MloDischargeSummaryListReportComponent', () => {
  let component: MloDischargeSummaryListReportComponent;
  let fixture: ComponentFixture<MloDischargeSummaryListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MloDischargeSummaryListReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MloDischargeSummaryListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
