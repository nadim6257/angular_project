import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLocationListComponent } from './work-location-list.component';

describe('WorkLocationListComponent', () => {
  let component: WorkLocationListComponent;
  let fixture: ComponentFixture<WorkLocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkLocationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
