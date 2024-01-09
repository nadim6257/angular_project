import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborAssignComponent } from './labor-assign.component';

describe('LaborAssignComponent', () => {
  let component: LaborAssignComponent;
  let fixture: ComponentFixture<LaborAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
