import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MloDischargeSummaryListComponent } from './mlo-discharge-summary-list.component';

describe('MloDischargeSummaryListComponent', () => {
  let component: MloDischargeSummaryListComponent;
  let fixture: ComponentFixture<MloDischargeSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MloDischargeSummaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MloDischargeSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
