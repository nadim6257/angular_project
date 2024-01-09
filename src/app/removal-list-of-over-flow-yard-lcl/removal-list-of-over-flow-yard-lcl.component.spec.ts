import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovalListOfOverFlowYardLclComponent } from './removal-list-of-over-flow-yard-lcl.component';

describe('RemovalListOfOverFlowYardLclComponent', () => {
  let component: RemovalListOfOverFlowYardLclComponent;
  let fixture: ComponentFixture<RemovalListOfOverFlowYardLclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovalListOfOverFlowYardLclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovalListOfOverFlowYardLclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
