import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationCategoryListComponent } from './designation-category-list.component';

describe('DesignationCategoryListComponent', () => {
  let component: DesignationCategoryListComponent;
  let fixture: ComponentFixture<DesignationCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
