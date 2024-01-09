import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedGangListComponent } from './assigned-gang-list.component';

describe('AssignedGangListComponent', () => {
  let component: AssignedGangListComponent;
  let fixture: ComponentFixture<AssignedGangListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedGangListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedGangListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
