import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GangAddComponent } from './gang-add.component';

describe('GangAddComponent', () => {
  let component: GangAddComponent;
  let fixture: ComponentFixture<GangAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GangAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GangAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
