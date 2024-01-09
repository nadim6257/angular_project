import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovalListOfOverFlowYardComponent } from './removal-list-of-over-flow-yard.component';

describe('RemovalListOfOverFlowYardComponent', () => {
  let component: RemovalListOfOverFlowYardComponent;
  let fixture: ComponentFixture<RemovalListOfOverFlowYardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovalListOfOverFlowYardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovalListOfOverFlowYardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
