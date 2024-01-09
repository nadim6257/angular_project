import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MloWiseImportLoadedContainerSummaryComponent } from './mlo-wise-import-loaded-container-summary.component';

describe('MloWiseImportLoadedContainerSummaryComponent', () => {
  let component: MloWiseImportLoadedContainerSummaryComponent;
  let fixture: ComponentFixture<MloWiseImportLoadedContainerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MloWiseImportLoadedContainerSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MloWiseImportLoadedContainerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
