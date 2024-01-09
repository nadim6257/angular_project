import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorRtgHandlingPerformanceComponent } from './operator-rtg-handling-performance.component';

describe('OperatorRtgHandlingPerformanceComponent', () => {
  let component: OperatorRtgHandlingPerformanceComponent;
  let fixture: ComponentFixture<OperatorRtgHandlingPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorRtgHandlingPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorRtgHandlingPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
