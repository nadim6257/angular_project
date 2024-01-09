import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorQgcHandlingPerformanceComponent } from './operator-qgc-handling-performance.component';

describe('OperatorQgcHandlingPerformanceComponent', () => {
  let component: OperatorQgcHandlingPerformanceComponent;
  let fixture: ComponentFixture<OperatorQgcHandlingPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorQgcHandlingPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorQgcHandlingPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
