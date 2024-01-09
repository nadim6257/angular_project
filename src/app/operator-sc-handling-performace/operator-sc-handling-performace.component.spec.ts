import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorScHandlingPerformaceComponent } from './operator-sc-handling-performace.component';

describe('OperatorScHandlingPerformaceComponent', () => {
  let component: OperatorScHandlingPerformaceComponent;
  let fixture: ComponentFixture<OperatorScHandlingPerformaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorScHandlingPerformaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorScHandlingPerformaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
