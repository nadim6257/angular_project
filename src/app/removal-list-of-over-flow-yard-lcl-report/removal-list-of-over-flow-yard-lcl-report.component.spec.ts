import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovalListOfOverFlowYardLclReportComponent } from './removal-list-of-over-flow-yard-lcl-report.component';

describe('RemovalListOfOverFlowYardLclReportComponent', () => {
  let component: RemovalListOfOverFlowYardLclReportComponent;
  let fixture: ComponentFixture<RemovalListOfOverFlowYardLclReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovalListOfOverFlowYardLclReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovalListOfOverFlowYardLclReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
