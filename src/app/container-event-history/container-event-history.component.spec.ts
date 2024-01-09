import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerEventHistoryComponent } from './container-event-history.component';

describe('ContainerEventHistoryComponent', () => {
  let component: ContainerEventHistoryComponent;
  let fixture: ComponentFixture<ContainerEventHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerEventHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerEventHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
