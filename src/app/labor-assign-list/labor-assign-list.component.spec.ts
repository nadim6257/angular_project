import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborAssignListComponent } from './labor-assign-list.component';

describe('LaborAssignListComponent', () => {
  let component: LaborAssignListComponent;
  let fixture: ComponentFixture<LaborAssignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborAssignListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborAssignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
