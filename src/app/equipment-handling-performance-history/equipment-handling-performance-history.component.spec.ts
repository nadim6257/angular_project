import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentHandlingPerformanceHistoryComponent } from './equipment-handling-performance-history.component';

describe('EquipmentHandlingPerformanceHistoryComponent', () => {
  let component: EquipmentHandlingPerformanceHistoryComponent;
  let fixture: ComponentFixture<EquipmentHandlingPerformanceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentHandlingPerformanceHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentHandlingPerformanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
