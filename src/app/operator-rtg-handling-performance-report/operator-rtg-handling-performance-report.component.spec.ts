import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorRtgHandlingPerformanceReportComponent } from './operator-rtg-handling-performance-report.component';

describe('OperatorRtgHandlingPerformanceReportComponent', () => {
  let component: OperatorRtgHandlingPerformanceReportComponent;
  let fixture: ComponentFixture<OperatorRtgHandlingPerformanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorRtgHandlingPerformanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorRtgHandlingPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
