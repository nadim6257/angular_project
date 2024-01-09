import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDischargeListAppComponent } from './container-discharge-list-app.component';

describe('ContainerDischargeListAppComponent', () => {
  let component: ContainerDischargeListAppComponent;
  let fixture: ComponentFixture<ContainerDischargeListAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerDischargeListAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerDischargeListAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
