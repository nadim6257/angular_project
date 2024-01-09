import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLocationEditComponent } from './work-location-edit.component';

describe('WorkLocationEditComponent', () => {
  let component: WorkLocationEditComponent;
  let fixture: ComponentFixture<WorkLocationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkLocationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
