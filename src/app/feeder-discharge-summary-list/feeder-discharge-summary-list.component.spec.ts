import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederDischargeSummaryListComponent } from './feeder-discharge-summary-list.component';

describe('FeederDischargeSummaryListComponent', () => {
  let component: FeederDischargeSummaryListComponent;
  let fixture: ComponentFixture<FeederDischargeSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeederDischargeSummaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeederDischargeSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
