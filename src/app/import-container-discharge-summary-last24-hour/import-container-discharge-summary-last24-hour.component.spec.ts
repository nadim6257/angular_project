import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContainerDischargeSummaryLast24HourComponent } from './import-container-discharge-summary-last24-hour.component';

describe('ImportContainerDischargeSummaryLast24HourComponent', () => {
  let component: ImportContainerDischargeSummaryLast24HourComponent;
  let fixture: ComponentFixture<ImportContainerDischargeSummaryLast24HourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContainerDischargeSummaryLast24HourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContainerDischargeSummaryLast24HourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
