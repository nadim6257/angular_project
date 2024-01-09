import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffDockDestinationWiseContainerComponent } from './off-dock-destination-wise-container.component';

describe('OffDockDestinationWiseContainerComponent', () => {
  let component: OffDockDestinationWiseContainerComponent;
  let fixture: ComponentFixture<OffDockDestinationWiseContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffDockDestinationWiseContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffDockDestinationWiseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
