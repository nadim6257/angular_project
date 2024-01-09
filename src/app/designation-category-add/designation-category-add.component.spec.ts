import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationCategoryAddComponent } from './designation-category-add.component';

describe('DesignationCategoryAddComponent', () => {
  let component: DesignationCategoryAddComponent;
  let fixture: ComponentFixture<DesignationCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationCategoryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
