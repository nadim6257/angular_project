import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedGangEditComponent } from './assigned-gang-edit.component';

describe('AssignedGangEditComponent', () => {
  let component: AssignedGangEditComponent;
  let fixture: ComponentFixture<AssignedGangEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedGangEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedGangEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
