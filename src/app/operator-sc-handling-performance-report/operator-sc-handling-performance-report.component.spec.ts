import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorScHandlingPerformanceReportComponent } from './operator-sc-handling-performance-report.component';

describe('OperatorScHandlingPerformanceReportComponent', () => {
  let component: OperatorScHandlingPerformanceReportComponent;
  let fixture: ComponentFixture<OperatorScHandlingPerformanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorScHandlingPerformanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorScHandlingPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
