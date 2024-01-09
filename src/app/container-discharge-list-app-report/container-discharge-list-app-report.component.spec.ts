import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDischargeListAppReportComponent } from './container-discharge-list-app-report.component';

describe('ContainerDischargeListAppReportComponent', () => {
  let component: ContainerDischargeListAppReportComponent;
  let fixture: ComponentFixture<ContainerDischargeListAppReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerDischargeListAppReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerDischargeListAppReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
