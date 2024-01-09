import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCategoryAddComponent } from './work-category-add.component';

describe('WorkCategoryAddComponent', () => {
  let component: WorkCategoryAddComponent;
  let fixture: ComponentFixture<WorkCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCategoryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
