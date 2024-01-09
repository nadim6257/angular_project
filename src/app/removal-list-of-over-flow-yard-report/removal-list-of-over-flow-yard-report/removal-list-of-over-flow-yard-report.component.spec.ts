import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovalListOfOverFlowYardReportComponent } from './removal-list-of-over-flow-yard-report.component';

describe('RemovalListOfOverFlowYardReportComponent', () => {
  let component: RemovalListOfOverFlowYardReportComponent;
  let fixture: ComponentFixture<RemovalListOfOverFlowYardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovalListOfOverFlowYardReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovalListOfOverFlowYardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
