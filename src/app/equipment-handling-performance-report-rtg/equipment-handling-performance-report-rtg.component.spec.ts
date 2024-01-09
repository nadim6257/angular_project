import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentHandlingPerformanceReportRtgComponent } from './equipment-handling-performance-report-rtg.component';

describe('EquipmentHandlingPerformanceReportRtgComponent', () => {
  let component: EquipmentHandlingPerformanceReportRtgComponent;
  let fixture: ComponentFixture<EquipmentHandlingPerformanceReportRtgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentHandlingPerformanceReportRtgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentHandlingPerformanceReportRtgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
