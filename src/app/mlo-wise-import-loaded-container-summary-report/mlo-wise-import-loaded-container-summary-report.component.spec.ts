import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MloWiseImportLoadedContainerSummaryReportComponent } from './mlo-wise-import-loaded-container-summary-report.component';

describe('MloWiseImportLoadedContainerSummaryReportComponent', () => {
  let component: MloWiseImportLoadedContainerSummaryReportComponent;
  let fixture: ComponentFixture<MloWiseImportLoadedContainerSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MloWiseImportLoadedContainerSummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MloWiseImportLoadedContainerSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
