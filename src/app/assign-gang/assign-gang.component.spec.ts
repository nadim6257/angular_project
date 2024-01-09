import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGangComponent } from './assign-gang.component';

describe('AssignGangComponent', () => {
  let component: AssignGangComponent;
  let fixture: ComponentFixture<AssignGangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignGangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignGangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
