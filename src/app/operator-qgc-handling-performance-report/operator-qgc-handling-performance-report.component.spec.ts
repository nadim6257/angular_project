import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorQgcHandlingPerformanceReportComponent } from './operator-qgc-handling-performance-report.component';

describe('OperatorQgcHandlingPerformanceReportComponent', () => {
  let component: OperatorQgcHandlingPerformanceReportComponent;
  let fixture: ComponentFixture<OperatorQgcHandlingPerformanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorQgcHandlingPerformanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorQgcHandlingPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
