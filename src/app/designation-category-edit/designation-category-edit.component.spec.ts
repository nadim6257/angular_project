import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationCategoryEditComponent } from './designation-category-edit.component';

describe('DesignationCategoryEditComponent', () => {
  let component: DesignationCategoryEditComponent;
  let fixture: ComponentFixture<DesignationCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationCategoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
