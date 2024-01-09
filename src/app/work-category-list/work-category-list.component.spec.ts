import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCategoryListComponent } from './work-category-list.component';

describe('WorkCategoryListComponent', () => {
  let component: WorkCategoryListComponent;
  let fixture: ComponentFixture<WorkCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
