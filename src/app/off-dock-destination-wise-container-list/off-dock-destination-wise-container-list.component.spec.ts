import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffDockDestinationWiseContainerListComponent } from './off-dock-destination-wise-container-list.component';

describe('OffDockDestinationWiseContainerListComponent', () => {
  let component: OffDockDestinationWiseContainerListComponent;
  let fixture: ComponentFixture<OffDockDestinationWiseContainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffDockDestinationWiseContainerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffDockDestinationWiseContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
