import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContainerDischargeExcelDetailLast24HourComponent } from './import-container-discharge-excel-detail-last24-hour.component';

describe('ImportContainerDischargeExcelDetailLast24HourComponent', () => {
  let component: ImportContainerDischargeExcelDetailLast24HourComponent;
  let fixture: ComponentFixture<ImportContainerDischargeExcelDetailLast24HourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContainerDischargeExcelDetailLast24HourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContainerDischargeExcelDetailLast24HourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
